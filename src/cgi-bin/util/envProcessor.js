/**
 * Process the incoming variables from apache and create a request object
 * @file envProcessor.js
 * @namespace envProcessor
 * @author Mitchell Sawatzky
 * @since July 12, 2017
 * @copyright Alberta Student Energy Conference, 2017
 */

const path = require("path");
const uuid = require("uuid/v1");

// {
//     "SCRIPT_URL": "/",
//     "SCRIPT_URI": "https://asec/",
//     "HTTPS": "on",
//     "SSL_TLS_SNI": "asec",
//     "HTTP_HOST": "asec",
//     "HTTP_CONNECTION": "keep-alive",
//     "HTTP_PRAGMA": "no-cache",
//     "HTTP_CACHE_CONTROL": "no-cache",
//     "HTTP_UPGRADE_INSECURE_REQUESTS": "1",
//     "HTTP_USER_AGENT": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36",
//     "HTTP_ACCEPT": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
//     "HTTP_ACCEPT_ENCODING": "gzip, deflate, br",
//     "HTTP_ACCEPT_LANGUAGE": "en-US,en;q=0.8",
//     "PATH": "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin",
//     "SERVER_SIGNATURE": "",
//     "SERVER_SOFTWARE": "Apache/2.4.25 (Unix) OpenSSL/1.1.0e",
//     "SERVER_NAME": "asec",
//     "SERVER_ADDR": "127.0.0.1",
//     "SERVER_PORT": "443",
//     "REMOTE_ADDR": "127.0.0.1",
//     "DOCUMENT_ROOT": "/srv/http/asec.ca-ssl/",
//     "REQUEST_SCHEME": "https",
//     "CONTEXT_PREFIX": "",
//     "CONTEXT_DOCUMENT_ROOT": "/srv/http/asec.ca-ssl/",
//     "SERVER_ADMIN": "it@asec.ca",
//     "SCRIPT_FILENAME": "/srv/http/asec.ca-ssl/cgi-bin/init.js",
//     "REMOTE_PORT": "49584",
//     "GATEWAY_INTERFACE": "CGI/1.1",
//     "SERVER_PROTOCOL": "HTTP/1.1",
//     "REQUEST_METHOD": "GET",
//     "QUERY_STRING": "",
//     "REQUEST_URI": "/",
//     "SCRIPT_NAME": "/"
// }

module.exports.process = function () {
    log.debug("Processing environment...");

    if (!process.env.hasOwnProperty('SERVER_SOFTWARE')) {
        // we got invoked without environment variables; mock them.
        process.env.REQUEST_URI = "/test?debug=true";
        process.env.SCRIPT_URL = process.argv[2] ? process.argv[2] : "/test";
        process.env.REQUEST_METHOD = "GET";
        process.env.QUERY_STRING = "debug=true";
    }

    let request = {
        id: uuid(),
        href: path.resolve(process.env.REQUEST_URI),
        pathname: path.resolve(process.env.SCRIPT_URL),
        method: process.env.REQUEST_METHOD,
        query: {},
        headers: {}
    };
    process.env.REQUEST_ID = request.id;

    let components = process.env.QUERY_STRING.split("&");
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

        request.query[key] = val;
    }

    return request;
}
