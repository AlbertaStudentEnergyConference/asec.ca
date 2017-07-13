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
global.log = require(`${__rootname}/util/log`);
const envProcessor = require(`${__rootname}/util/envProcessor`);
const dbC = require(`${__rootname}/db/db`);


log.debug("Starting...");
let request = envProcessor.process();
log.info(`Serving ${request.href}`);
log.debug(`Request ID: ${request.id}`);

log.debug("Obtaining database connection...");
dbC.acquire(function () {
    request.db = db;
    log.debug("Obtained database connection");

    log.debug("Done.");

    // We're all done here.
    exitProcedures.shutdown(0);
});
