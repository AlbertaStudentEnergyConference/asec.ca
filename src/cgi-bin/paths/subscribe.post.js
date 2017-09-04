/**
 * Subscribe to the mailing list
 * @file subscribe.post.js
 * @author Mitchell Sawatzky
 * @since September 4, 2017
 * @copyright Alberta Student Energy Conference, 2017
 */

const template = require(`${__rootname}/util/template.js`);
const error = require(`${__rootname}/util/error.js`);
const query2json = require(`${__rootname}/util/query2json.js`);

module.exports.matchPaths = [
    "/subscribe", "/subscribe/"
];

module.exports.handle = function (request, clbk) {
    let query = query2json.q2j(request.queryData);
    if (query.email && query.email.length) {
        if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(query.email)) {
            request.db.query("INSERT IGNORE INTO mailinglist VALUES (UUID(), ?);", query.email, function (err) {
                if (err) {
                    clbk(err);
                    return;
                }
                request.body = template.get("default.html", {
                    title: "ASEC | Subscribe",
                    content: `<div class="textbody">Thank you for subscribing.</div>`,
                    cache: request.cacheControl,
                    id: request.id,
                    time: Date.now() - process.env.REQUEST_START,
                    head: ''
                });
                clbk();
            });
        } else {
            clbk(new error.UnmetExpectationError(`Email is not an email`));
        }
    } else {
        clbk(new error.UnmetExpectationError(`Expected an email`));
    }
};
