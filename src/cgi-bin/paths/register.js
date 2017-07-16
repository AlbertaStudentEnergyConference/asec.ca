/**
 * Request handler for the register page
 * @file register.js
 * @author Mitchell Sawatzky
 * @since July 12, 2017
 * @copyright Alberta Student Energy Conference, 2017
 */

const template = require(`${__rootname}/util/template`);

module.exports.matchPaths = [
    "/register", "/register/", "/register/index.html", "/go"
];

module.exports.handle = function (request, clbk) {
    request.body = template.get("default.html", {
        title: "ASEC | Register",
        content: "",
        cache: request.cacheControl,
        id: request.id,
        time: Date.now() - process.env.REQUEST_START,
        head: ''
    });

    clbk();
};
