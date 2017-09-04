/**
 * @author Mitchell Sawatzky <s@watz.ky>
 * @since September 3, 2017
 * @file init.js
 * @requires jquery
 * Contains global init logic for the entire site
 */

var asec = asec || {};

// build a nice param object
asec.querystring = {};
for (let querystring of document.location.search.substr(1).split("&")) {
    let query = querystring.split("=");
    let key = decodeURIComponent(query.splice(0, 1)).trim();
    let val = decodeURIComponent(query.join("=")).trim();
    if (key.length) {
        asec.querystring[key] = val.length ? val : "";
    }
}

// jquery hooks
$(document).ready(function () {
    if (asec.querystring.hasOwnProperty("debug")) {
        $(".debug").removeClass("invis");
    }
});
