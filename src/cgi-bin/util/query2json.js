/**
 * Convert a querystring to a json object
 * @file query2json.js
 * @namespace query2json
 * @author Mitchell Sawatzky
 * @since September 3, 2017
 * @copyright Alberta Student Energy Conference, 2017
 */

module.exports.q2j = function (querystring) {
    let json = {};
    let components = querystring.split("&");
    for (let component of components) {
        let comp = component.split("=");
        let key = comp.splice(0, 1);
        let val = comp.join("=");

        try {
            key = decodeURIComponent(key);
        } catch (e) {
            if (e instanceof URIError) {
                // those bastards gave us a bad QUERY_STRING
            } else {
                throw e;
            }
        }
        try {
            val = decodeURIComponent(val);
        } catch (e) {
            if (e instanceof URIError) {
                // those bastards gave us a bad QUERY_STRING
            } else {
                throw e;
            }
        }

        json[key] = val;
    }
    return json;
};
