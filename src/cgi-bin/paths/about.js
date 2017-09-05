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
        keywords: ["asec", "alberta", "student", "energy", "conference", "about", "what is"],
        title: "ASEC | About",
        content: template.get("about.html", {

        }),
        cache: request.cacheControl,
        id: request.id,
        time: Date.now() - process.env.REQUEST_START,
        head: `<link rel="stylesheet" type="text/css" href="/static/stylesheets/about.css?v=${request.cacheControl.css}" />`
    });

    clbk();
};
