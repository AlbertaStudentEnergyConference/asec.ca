/**
 * Request handler for the about page
 * @file about.js
 * @author Mitchell Sawatzky
 * @since July 12, 2017
 * @copyright Alberta Student Energy Conference, 2017
 */

const template = require(`${__rootname}/util/template`);

module.exports.matchPaths = [
    "/about", "/about/", "/about/index.html"
];

module.exports.handle = function (request, clbk) {
    request.body = template.get("default.html", {
        title: "ASEC | About",
        content: "",
        cache: request.cacheControl,
        id: request.id,
        time: Date.now() - process.env.REQUEST_START,
        head: ''
    });

    clbk();
};
