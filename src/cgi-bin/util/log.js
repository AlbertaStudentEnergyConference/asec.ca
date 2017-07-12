/**
 * Functions for logging to files
 * @file log.js
 * @namespace util.log
 * @author Mitchell Sawatzky
 * @since June 10, 2017
 * @copyright Alberta Student Energy Conference, 2017
 */

const fs = require("fs");

const config = require(`${__rootname}/config`).get();
const exitProcedures = require(`${__rootname}/util/exitProcedures`);
const constants = require(`${__rootname}/util/const`);
const time = require(`${__rootname}/util/time`);

var slowYourRoll = false;
var logBuf = [];
var logFile = fs.createWriteStream(`${__rootname}/${config.log.LogFile}`, {
    flags: "a"
});
var done = false;

// register a close hook so the file gets closed
exitProcedures.register(constants.priority.MEDIUM, function(clbk) {
    logFile.end(function() {
        done = true;
        clbk();
    });
});

/**
 * Underlying logging function
 * @function _log
 * @param {String} msg - the message to log
 * @returns {undefined}
 */
function _log (msg) {
    if (slowYourRoll) {
        if (msg) {
            logBuf.push(msg);
        }
    } else {
        if (logBuf.length) {
            // there's messages stuck in the buffer, they go out first
            if (msg) {
                logBuf.push(msg);
            }
            msg = logBuf.splice(0, 1);
        }
        if (msg) {
            let ok;
            if (done) {
                process.stderr.write(msg);
                ok = true;
            } else {
                ok = logFile.write(msg);
            }
            if (!ok) {
                slowYourRoll = true;
                logFile.once("drain", function () {
                    slowYourRoll = false;
                });
            } else {
                if (logBuf.length) {
                    // keep emptying the buffer
                    _log();
                }
            }
        }
    }
}

module.exports = function (msg) {
    if (config.log.LogLevel >= constants.loglevel.STANDARD) {
        _log(`${time.timestamp()} [STD] ${msg}\n`);
    }
};

module.exports.debug = function (msg) {
    if (config.log.LogLevel >= constants.loglevel.DEBUG) {
        _log(`${time.timestamp()} [DBG] ${msg}\n`);
    }
};

module.exports.info = function (msg) {
    if (config.log.LogLevel >= constants.loglevel.INFO) {
        _log(`${time.timestamp()} [INF] ${msg}\n`);
    }
};

module.exports.log = function (msg) {
    if (config.log.LogLevel >= constants.loglevel.STANDARD) {
        _log(`${time.timestamp()} [STD] ${msg}\n`);
    }
};
module.exports.std = module.exports.log;

module.exports.warn = function (msg) {
    if (config.log.LogLevel >= constants.loglevel.STANDARD) {
        _log(`${time.timestamp()} [WRN] ${msg}\n`);
    }
};
module.exports.wrn = module.exports.warn;

module.exports.err = function (msg) {
    if (config.log.LogLevel >= constants.loglevel.CRITICAL) {
        _log(`${time.timestamp()} [ERR] ${msg}\n`);
    }
};
module.exports.error = module.exports.err;

module.exports.fatal = function (msg) {
    if (config.log.LogLevel >= constants.loglevel.CRITICAL) {
        _log(`${time.timestamp()} [FTL] ${msg}\n`);
    }
};
