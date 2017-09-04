/**
 * Request handler for the register page
 * @file register.js
 * @author Mitchell Sawatzky
 * @since July 12, 2017
 * @copyright Alberta Student Energy Conference, 2017
 */

const template = require(`${__rootname}/util/template`);
const config = require(`${__rootname}/config`).get();

module.exports.matchPaths = [
    "/register", "/register/", "/register/index.html", "/go"
];

module.exports.handle = function (request, clbk) {
    // is there a ticket to register?
    request.db.query("SELECT COUNT(*) FROM attendee;", function(err, rep) {
        if (err) {
            throw err;
        }
        if (!config.tickets.RegistrationClosed && rep[0]["COUNT(*)"] < config.tickets.TicketMax) {
            // registration is open
            request.body = template.get("default.html", {
                title: "ASEC | Register",
                content: template.get("register_open.html", {}),
                cache: request.cacheControl,
                id: request.id,
                time: Date.now() - process.env.REQUEST_START,
                head: '<link rel="stylesheet" type="text/css" href="/static/stylesheets/register.css" />'
            });
        } else {
            // registration is closed
            request.body = template.get("default.html", {
                title: "ASEC | Register",
                content: template.get("register_closed.html", {}),
                cache: request.cacheControl,
                id: request.id,
                time: Date.now() - process.env.REQUEST_START,
                head: ''
            });
        }
        clbk();
    });
};
