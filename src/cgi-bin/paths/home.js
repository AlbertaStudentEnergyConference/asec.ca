/**
 * Request handler for the homepage
 * @file home.js
 * @author Mitchell Sawatzky
 * @since July 12, 2017
 * @copyright Alberta Student Energy Conference, 2017
 */

const template = require(`${__rootname}/util/template`);

module.exports.matchPaths = [
    "/", "", "/index", "/index.html"
];

module.exports.handle = function (request, clbk) {
    // get all dem sponsors
    // order by id so that the output is always consistent (wouldn't want the page to change randomly every refresh)
    request.db.query("SELECT level, name, image, link FROM sponsors ORDER BY id", function (err, rows) {
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
            Energybowl: []
        };
        for (let row of rows) {
            sponsors[row.level].push(template.get("sponsors/sponsor.html", {
                link: row.link,
                image: row.image,
                title: row.name
            }));
        }
        let sponsorHTML = [];
        let sponsorTableHeader = [];
        let sponsorTableGroups = [];
        for (let prop in sponsors) {
            // if we have sponsors in this category
            if (sponsors[prop].length) {
                sponsorTableHeader.push(`<td class="primaryFont">${prop}</td>`);
                sponsorTableGroups.push(`<colgroup span="1" class="sponsorGroup ${prop}"></colgroup>`);
                sponsorHTML.push(template.get("sponsors/section.html", {
                    level: prop.replace(/\s/g, ""),
                    sponsors: sponsors[prop].join("\n")
                }));
            }
        }
        request.body = template.get("default.html", {
            title: "Alberta Student Energy Conference",
            content: template.get("home.html", {
                sponsorHeader: sponsorTableHeader.join(""),
                sponsors: sponsorHTML.join("\n"),
                sponsorGroups: sponsorTableGroups.join("")
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
