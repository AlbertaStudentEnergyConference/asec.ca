/**
 * Request handler for the homepage
 * @file home.js
 * @author Mitchell Sawatzky
 * @since July 12, 2017
 * @copyright Alberta Student Energy Conference, 2017
 */

const template = require(`${__rootname}/util/template`);
const config = require(`${__rootname}/config`).get();

module.exports.matchPaths = [
    "/", "", "/index", "/index.html"
];

module.exports.handle = function (request, clbk) {
    // get all dem sponsors
    // order by id so that the output is always consistent (wouldn't want the page to change randomly every refresh)
    request.db.query("SELECT level, name, image, link FROM sponsors WHERE year = ? ORDER BY id", config.conference.SponsorYear, function (err, rows) {
        if (err) {
            clbk(err);
            return;
        }
        let sponsors = {
            Platinum: [],
            Gold: [],
            Silver: [],
            Bronze: [],
            Table: [],
            "Energy Bowl": []
        };
        for (let row of rows) {
            sponsors[row.level].push(template.get("sponsors/sponsor.html", {
                link: row.link,
                image: row.image,
                title: row.name
            }));
        }
        let sponsorHTML = [];
        let sponsorPlatinumHeader = `<span class="primaryFont">Platinum</span>`;
        let sponsorPlatinum = sponsors.Platinum.length ? sponsors.Platinum.join("\n") : "";
        for (let prop in sponsors) {
            // Platinum sponsors don't go in the table
            if (prop === "Platinum") {
                continue;
            }
            // if we have sponsors in this category
            if (sponsors[prop].length) {
                sponsorHTML.push(template.get("sponsors/section.html", {
                    level: prop.replace(/\s/g, ""),
                    levelDisplay: prop,
                    sponsors: sponsors[prop].join("\n")
                }));
            }
        }
        request.body = template.get("default.html", {
            keywords: [
                "asec", "alberta", "student", "energy", "conference", "home", "oil", "show", "uofc", "university",
                "calgary", "momentum", "petroleum"
            ],
            title: "Alberta Student Energy Conference",
            content: template.get("home.html", {
                sponsorPlatinum: sponsorPlatinum,
                sponsorPlatinumHeader: sponsorPlatinum.length ? sponsorPlatinumHeader : "",
                sponsors: sponsorHTML.join("\n"),
                sponsorYear: config.conference.SponsorYear
            }),
            cache: request.cacheControl,
            id: request.id,
            time: Date.now() - process.env.REQUEST_START,
            head: `<link rel="stylesheet" type="text/css" href="/static/stylesheets/home.css" />
                   <link rel="stylesheet" type="text/css" href="/static/stylesheets/sponsors.css" />`
        });

        clbk();
    });
};
