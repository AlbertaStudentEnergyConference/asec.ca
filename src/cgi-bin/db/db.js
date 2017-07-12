/**
 * Database wrapper
 * @file db.js
 * @namespace db
 * @author Mitchell Sawatzky
 * @since July 12, 2017
 * @copyright Alberta Student Energy Conference, 2017
 */

const mysql = require("mysql");
const constants = require(`${__rootname}/util/const`);
const exitProcedures = require(`${__rootname}/util/exitProcedures`)
const credentials = require(`${__rootname}/db/auth.json`);

let dbRegistry = [];

module.exports.acquire = function (callback) {
    let id = dbRegistry.length;

    log.debug(`Shelling out DB connection...${id}`);

    let connection = {
        connection: mysql.createConnection({
            socketPath: "/run/mysqld/mysqld.sock",
            user: "asec",
            password: credentials.asec,
            database: "asec"
        }),
        index: id
    };
    connection.kill = function (clbk) {
        log.debug(`Attempting to end DB connection ${connection.index}...`);
        if (connection.connection.state !== "disconnected") {
            connection.connection.end(function (err) {
                if (err) {
                    log.error(`Could not close connection ${connection.index}`);
                    log.error(err.stack);
                } else {
                    log.debug(`Closed connection ${connection.index}`);
                }
                clbk();
            });
        } else {
            log.debug(`Aborting ending connection (already closed)`);
            clbk();
        }
    };

    dbRegistry.push(connection);


    connection.connection.connect(function (err) {
        if (err) {
            throw err;
        }

        if (connection.connection.state !== "authenticated") {
            throw new Error(`Bad connection state: ${connection.connection.state}`);
        }

        // try to close the connection on shutdown
        exitProcedures.register(constants.priority.HIGH, connection.kill);

        callback(connection.connection);
        return;
    });
};
