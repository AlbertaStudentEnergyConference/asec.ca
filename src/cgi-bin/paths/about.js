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
        content: "The Alberta Student Energy Conference (ASEC) is an annual event for undergraduate engineering, geoscience and business students. ASEC takes place over two days at and connects aspiring students with professionals and experts from the energy industry. Students are provided with various opportunities to explore, engage and learn in order to contribute to the industry.",
        cache: request.cacheControl,
        id: request.id,
        time: Date.now() - process.env.REQUEST_START,
        head: ''
    });

    clbk();
};
