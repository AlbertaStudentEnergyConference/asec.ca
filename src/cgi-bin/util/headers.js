/**
 * Utilities for HTTP headers
 * @file headers.js
 * @namespace headers
 * @author Mitchell Sawatzky
 * @since July 12, 2017
 * @copyright Alberta Student Energy Conference, 2017
 */

const constants = require(`${__rootname}/util/const`);

module.exports.setDefaultHeaders = function (request) {
    for (let key in constants.default_headers) {
        module.exports.setHeader(request, key, constants.default_headers[key]);
    }
};

module.exports.setHeader = function (request, key, val) {
    request.headers[key.toLowerCase()] = val;
};

module.exports.unsetHeader = function (request, key) {
    delete request.headers[key.toLowerCase()];
};

module.exports.get = function (request) {
    let headers = [];
    for (let key in request.headers) {
        headers.push(`${key}: ${request.headers[key]}`);
    }
    return headers.join("\n");
};
