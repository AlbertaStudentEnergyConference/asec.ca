/**
 * Request handler for the gallery
 * @file gallery.js
 * @author Mitchell Sawatzky
 * @since July 12, 2017
 * @copyright Alberta Student Energy Conference, 2017
 */

const template = require(`${__rootname}/util/template`);

module.exports.matchPaths = [
    "/gallery", "/gallery/", "/gallery/index.html"
];

module.exports.handle = function (request, clbk) {
    request.body = template.get("default.html", {
        title: "ASEC | Gallery",
        content: "",
        cache: request.cacheControl,
        id: request.id,
        time: Date.now() - process.env.REQUEST_START
    });

    clbk();
};