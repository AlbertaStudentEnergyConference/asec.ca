/**
 * Hooks to be called on shutdown
 * @file exitProcedures.js
 * @namespace util.exitprocedures
 * @author Mitchell Sawatzky
 * @since June 10, 2017
 * @copyright Alberta Student Energy Conference, 2017
 */

const error = require(`${__rootname}/util/error`);
const constants = require(`${__rootname}/util/const`);
const crashDump = require(`${__rootname}/util/crashDump`);

// functions to be called
var hooks = {};
hooks[constants.priority.HIGH] = [];
hooks[constants.priority.MEDIUM] = [];
hooks[constants.priority.LOW] = [];

/**
 * Error for invalid priorities
 * @class PriorityError
 * @member config
 * @extends ExtendableError
 */
class PriorityError extends error.ExtendableError {}
module.exports.PriorityError = PriorityError;

/**
 * Register a hook to be called on shutdown
 * @function register
 * @memberof util.exitprocedures
 * @throws
 * @param {Number} priority - the importance of the hook
 * @param {Function} hook - the hook to register
 * @returns {undefined}
 */
module.exports.register = function (priority, hook) {
    for (const p in constants.priority) {
        if (constants.priority[p] === priority) {
            if (typeof log !== 'undefined') {
                log.debug(`Registered exit hook @ ${p}`);
            }
            hooks[priority].unshift(hook);
            return;
        }
    }
    throw new PriorityError(`Invalid Priority: ${priority}`);
}

function onShutdown (code) {
    var running = 0;
    if (typeof code !== "number") {
        code = 1;
    }
    function execHooks (priority) {
        for (const hook of hooks[priority]) {
            running++;
            if (code === 0) {
                if (typeof log !== 'undefined') {
                    log.info(`[EXITHOOK] Executing exit hook at priority ${priority}`);
                } else {
                    process.stderr.write(`[EXITHOOK] Executing exit hook at priority ${priority}\n`);
                }
            }
            hook(function () {
                running--;
            });
        }
    }

    execHooks(constants.priority.HIGH);
    setTimeout(function () {
        execHooks(constants.priority.MEDIUM);
    }, 10)
    setTimeout(function () {
        execHooks(constants.priority.LOW);
    }, 20);
    setInterval(function () {
        if (running === 0) {
            process.exit(code);
        } else if (typeof log !== 'undefined') {
            log.warn(`[EXITHOOK] ${running} hooks still running...`);
        } else {
            process.stderr.write(`[EXITHOOK] ${running} hooks still running...\n`);
        }
    }, 100);
}

process.on("SIGHUP", function() {
    if (typeof log !== 'undefined') {
        log.fatal(`[EXITHOOK] Received SIGHUP`);
    }
    onShutdown(3);
}); // 3
process.on("SIGINT", function() {
    if (typeof log !== 'undefined') {
        log.fatal(`[EXITHOOK] Received SIGINT`);
    }
    onShutdown(2);
}); // 2
process.on("SIGTERM", function() {
    if (typeof log !== 'undefined') {
        log.fatal(`[EXITHOOK] Received SIGTERM`);
    }
    onShutdown(3);
}); // 1

/**
 * Manually call all the hooks (eg. program exits properly)
 * @function shutdown
 * @member utils.exitprocedures
 * @return {undefined}
 */
module.exports.shutdown = onShutdown;

process.once("uncaughtException", function (e) {
    if (typeof log !== 'undefined') {
        log.fatal(e.stack);
    }
    crashDump.dump(e.stack);
    onShutdown(1);
});
