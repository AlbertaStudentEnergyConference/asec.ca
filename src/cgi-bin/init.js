#!/usr/bin/node

/**
 * Entry point for all requests to the server
 * @file init.js
 * @namespace init
 * @author Mitchell Sawatzky
 * @since June 10, 2017
 * @copyright Alberta Student Energy Conference, 2017
 */

// First thing's first, we need to set up some globals for everyone else.
global.__rootname = __dirname; // rootname provides a means of absolute includes from this file's location

const output = require(`${__rootname}/util/output`);
const exitProcedures = require(`${__rootname}/util/exitProcedures`);
const log = require(`${__rootname}/util/log`);

log.debug("Starting...");
log.info(`Serving ${process.env.REQUEST_URI}`);
output.write("Content-type: text/html\n\n");
const temp = require("es6-template-strings");
const fs = require("fs");
let out = temp(fs.readFileSync(`${__rootname}/../templates/construction.html`).toString("utf-8"), {
    header: {
        title: "Alberta Student Energy Conference"
    }
});
output.write(out);

log.debug("Done.");

// We're all done here.
exitProcedures.shutdown(0);
