/**
 * Route requests based on their paths
 * @file pathRouter.js
 * @namespace pathRouter
 * @author Mitchell Sawatzky
 * @since July 12, 2017
 * @copyright Alberta Student Energy Conference, 2017
 */

const fs = require("fs");
const pathLib = require("path");

const headers = require(`${__rootname}/util/headers`);
const constants = require(`${__rootname}/util/const`);
const template = require(`${__rootname}/util/template`);

let registeredEndpoints = {
    GET: {},
    POST: {}
};

/**
 * Recursively decend into a directory and load endpoints
 * @param {string} path - the path to search
 * @returns {undefined}
 */
function descend (path) {
    var dir = fs.readdirSync(path);
    for (let i = 0; i < dir.length; i++) {
        if (dir[i].substr(0, 1) !== ".") {
            if (fs.lstatSync(path + "/" + dir[i]).isDirectory()) {
                descend(path + "/" + dir[i]);
            } else if (dir[i].substr(-3) === ".js") {
                let enpt = {};
                if (/^[a-z\-_0-9]*\.post\.js$/i.test(dir[i])) {
                    enpt.type = "POST";
                } else {
                    enpt.type = "GET";
                }
                enpt.name = dir[i].substring(0, dir[i].indexOf("."));
                enpt.abspath = pathLib.resolve(path + "/" + dir[i]);
                enpt.code = require(enpt.abspath);
                enpt.path = enpt.code.matchPath;
                registeredEndpoints[enpt.type][enpt.path] = enpt;
            } else {
                log.warn("Unexpected non-js file in endpoints: " + path + "/%r" + dir[i]);
            }
        }
    }
}

module.exports.init = function () {
    descend(`${__rootname}/paths`);
};

module.exports.handoff = function (request, clbk) {
    if (registeredEndpoints[request.method].hasOwnProperty(request.pathname)) {
        // found the page
        registeredEndpoints[request.method][request.pathname].handle(request, clbk);
    } else {
        // 404
        headers.setHeader(request, "status", `${constants.status.NOTFOUND.code} ${constants.status.NOTFOUND.text}`);

        request.body = template.get("errors/error.html", {
            error: constants.status.NOTFOUND,
            explanation: `The requested URL was not found on this server.`,
            url: request.pathname,
            id: request.id,
            method: request.method
        });
        clbk();
    }
};
