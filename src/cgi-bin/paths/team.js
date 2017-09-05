/**
 * Request handler for the homepage
 * @file index.js
 * @author Mitchell Sawatzky
 * @since July 12, 2017
 * @copyright Alberta Student Energy Conference, 2017
 */

const fs = require("fs");
const template = require(`${__rootname}/util/template`);

module.exports.matchPaths = [
    "/team", "/team/", "/team/index.html"
];

module.exports.handle = function (request, clbk) {
    log.debug("Searching for team members");
    request.db.query('SELECT name,position,email,phone FROM team where type = "executive"', function (err, results) {
        if (err) {
            throw err;
        }

        let searching = 0;
        let vicePresidents = [];
        let bigBoss = [];
        log.debug("Generating image URLS");
        for (let result of results) {
            // look for a photo
            searching++;
            fs.stat(`${__rootname}/../static/images/headshots/${result.name.toLowerCase().replace(/\s/g, "_")}.png`, function (err) {
                let img;
                if (err) {
                    // no file
                    img = "/static/images/headshots/default.png";
                } else {
                    img = `/static/images/headshots/${result.name.toLowerCase().replace(/\s/g, "_")}.png`;
                }

                let entry = `<li class="teamMember primaryFont">
                                <div class="headshot">
                                    <img title="${result.name}" src="${img}"></img>
                                </div>
                                <div class="memberInfo">
                                    <span class="memberName">${result.name}</span><br />
                                    <span class="memberPosition secondaryFont">${result.position}</span><br />
                                    <span class="memberEmail">E. <a href="mailto:${result.email}" class="subtleLink">${result.email}</a></span>
                                    ${result.phone ? `<br /><span class="memberPhone">P. <a href="tel:${result.phone}" class="subtleLink">${result.phone}</a></span>` : ""}
                                </div>
                            </li>`;

                if (result.position === "Co-Chair") {
                    bigBoss.push(entry);
                } else {
                    vicePresidents.push(entry);
                }
                searching--;
                if (searching === 0) {
                    // should be done searching now
                    log.debug("Done searching");
                    log.debug("Getting directors");
                    request.db.query('SELECT name,position FROM team WHERE type = "director" ORDER BY name', function (err, results) {
                        if (err) {
                            throw err;
                        }
                        let directors = [];
                        for (let result of results) {
                            entry = `<li class="teamMember primaryFont">
                                        <div class="memberInfo">
                                            <span class="memberName">${result.name}</span><br />
                                            <span class="memberPosition secondaryFont">${result.position}</span>
                                        </div>
                                    </li>`;
                            directors.push(entry);
                        }
                        bigBoss.sort();
                        vicePresidents.sort();
                        request.body = template.get("default.html", {
                            keywords: ["asec", "alberta", "student", "energy", "conference", "team", "group", "members"],
                            title: "ASEC | Team",
                            content: template.get("team.html", {
                                chairs: bigBoss.join(''),
                                execs: vicePresidents.join(''),
                                directors: directors.join('')
                            }),
                            cache: request.cacheControl,
                            id: request.id,
                            time: Date.now() - process.env.REQUEST_START,
                            head: '<link rel="stylesheet" type="text/css" href="/static/stylesheets/team.css" />'
                        });

                        clbk();
                    });
                } else {
                    log.debug(`${searching} tasks are still running...`);
                }
            });
        }
    });
};
