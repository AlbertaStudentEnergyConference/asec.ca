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
            hooks[priority].unshift(hook);
            return;
        }
    }
    throw new PriorityError(`Invalid Priority: ${priority}`);
}

function onShutdown (code) {
    var running = 0;
    if (!code) {
        code = 1;
    }
    function execHooks (priority) {
        for (const hook of hooks[priority]) {
            running++;
            if (code === 0) {
                process.stderr.write(`[EXITHOOK] Executing exit hook at priority ${priority}\n`);
            }
            hook(function () {
                running--;
            });
        }
    }

    execHooks(constants.priority.HIGH);
    execHooks(constants.priority.MEDIUM);
    execHooks(constants.priority.LOW);
    setInterval(function () {
        if (running === 0) {
            process.exit();
        } else {
            process.stderr.write(`[EXITHOOK] ${running} hooks still running...\n`);
        }
    }, 100);
}

process.on("SIGHUP", onShutdown); // 3
process.on("SIGINT", onShutdown); // 2
process.on("SIGTERM", onShutdown); // 1

/**
 * Manually call all the hooks (eg. program exits properly)
 * @function shutdown
 * @member utils.exitprocedures
 * @return {undefined}
 */
module.exports.shutdown = onShutdown;
