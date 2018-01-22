/**
 * Request handler for the homepage
 * @file index.js
 * @author Mitchell Sawatzky
 * @since July 12, 2017
 * @copyright Alberta Student Energy Conference, 2017
 */

const template = require(`${__rootname}/util/template`);

module.exports.matchPaths = [
    "/schedule", "/schedule/", "/shedule/index.html"
];

module.exports.handle = function (request, clbk) {
    request.body = template.get("default.html", {
        keywords: ["asec", "alberta", "student", "energy", "conference", "schedule", "when"],
        title: "ASEC | Schedule",
        content: template.get("schedule.html", {}),
        cache: request.cacheControl,
        id: request.id,
        time: Date.now() - process.env.REQUEST_START,
        head: '<link rel="stylesheet" href="/static/stylesheets/schedule.css" />'
    });

    clbk();
};
