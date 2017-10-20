/**
 * Provides a static version of the configuration file
 * @file config.js
 * @namespace config
 * @author Mitchell Sawatzky
 * @since June 10, 2017
 * @copyright Alberta Student Energy Conference, 2017
 */

const fs = require("fs");
const path = require("path");
const constants = require(`${__rootname}/util/const`);
const error = require(`${__rootname}/util/error`);

const CONFIG_PATH = path.resolve(`${__rootname}/../config.cfg`);

/**
 * The configuration object for everything
 * @constructor Config
 */
function Config () {
    // capture context
    var self = this;

    self.export = function () {
        var exp = {};
        for (const group in self.cfg) {
            exp[group] = {};
            for (const ruleName in self.cfg[group]) {
                try {
                    exp[group][ruleName] = self.cfg[group][ruleName].get();
                } catch (e) {
                    if (self.cfg[group][ruleName].required) {
                        throw new InvalidConfigError(`Rule required but not set: ${group}::${ruleName}`);
                    }
                    exp[group][ruleName] = self.cfg[group][ruleName].default;
                }
            }
        }
        return exp;
    }

    self.cfg = {
        log: {
            LogLevel: new ConfigEntry(true, parseInt, function (v) {
                for (const p in constants.loglevel) {
                    if (constants.loglevel[p] === v) {
                        return true;
                    }
                }
                return false;
            }),
            LogFile: new ConfigEntry(true, null, function (v) {
                return typeof v === "string";
            })
        },
        studenttickets: {
            TicketMax: new ConfigEntry(true, parseInt, function (v) {
                return !isNaN(v);
            }),
            TicketPrice: new ConfigEntry(true, parseFloat, function (v) {
                return typeof v === "number";
            }),
            RegistrationClosed: new ConfigEntry(true, function (v) {
                return v === "true";
            }, function (v) {
                return typeof v === "boolean";
            })
        },
        industrytickets: {
            TicketMax: new ConfigEntry(true, parseInt, function (v) {
                return !isNaN(v);
            }),
            TicketPrice: new ConfigEntry(true, parseFloat, function (v) {
                return typeof v === "number";
            }),
            RegistrationClosed: new ConfigEntry(true, function (v) {
                return v === "true";
            }, function (v) {
                return typeof v === "boolean";
            })
        },
        conference: {
            Year: new ConfigEntry(true, parseInt, function (v) {
                return !isNaN(v) && v.toString().length === 4;
            })
        }
    };
}

/**
 * A property of the configuration object
 * @constructor ConfigEntry
 * @throws {ConfigEntryError} if an invalid value is set, if a value is gotten when unset, or if no default is provided
 *     when required is false
 * @param {Boolean} required - whether or not the entry is required for a valid config
 * @param {Function} transform - an optional function to transform the value IE. parseInt
 * @param {Function} check - a function to check if the data is OK. It recieves the value, and should return true or
 *     false.
 * @param {Object} def - the default value, required if required is false.
 */
function ConfigEntry (required, transform, check, def) {
    // capture context
    var self = this;

    self.required = required;
    self.check = check;
    self.transform = transform;
    self.default = def;
    self.value = null;

    self.set = function (v) {
        if (typeof self.transform === "function") {
            v = self.transform(v);
        }
        if (check(v)) {
            self.value = v;
        } else {
            throw new ConfigEntryError(`Invalid value: ${v}`);
        }
    }

    self.get = function () {
        if (self.value === null) {
            throw new ConfigEntryError(`Value not set`);
        }
        return self.value;
    }

    if (!required && typeof def === "undefined") {
        throw new ConfigEntryError("No default on an optional entry");
    }
}

/**
 * Retrieve the configuration file, or get it if it hasn't been gotten already
 * @function get
 * @member config
 * @throws {InvalidConfigError} if the config is not valid
 * @returns {Config}
 */
module.exports.get = function () {
    if (!module.exports.hasOwnProperty("_config")) {
        // get dat config
        let conf = new Config();
        let cfg = fs.readFileSync(CONFIG_PATH).toString("utf-8").split("\n");
        let group = null;
        for (let i = 0; i < cfg.length; i++) {
            let line = cfg[i].trim();
            // skip comments and blank lines
            if (line.length && line.substr(0, 1) !== "#") {
                let header = /^\[ ([A-Za-z]+) \]$/.exec(line);
                if (header) {
                    group = header[1].toLowerCase();
                    if (!conf.cfg.hasOwnProperty(group)) {
                        throw new InvalidConfigError(`Invalid group at ${CONFIG_PATH}:${i + 1}`);
                    }
                    continue;
                }

                if (!group) {
                    throw new InvalidConfigError(`Setting without group in ${CONFIG_PATH}:${i + 1}`);
                }

                let rule = /^([A-Za-z]+) ([^#]+)/.exec(line);
                if (!rule || !conf.cfg[group].hasOwnProperty(rule[1])) {
                    throw new InvalidConfigError(`Bad rule at ${CONFIG_PATH}:${i + 1}`);
                }
                try {
                    conf.cfg[group][rule[1]].set(rule[2].trim());
                } catch (e) {
                    throw new InvalidConfigError(`Invalid value at ${CONFIG_PATH}:${i + 1}`);
                }
            }
        }
        module.exports._config = conf.export();
    }
    return module.exports._config;
}

/**
 * Error for handling instances where a config is invalid
 * @class InvalidConfigError
 * @member config
 * @extends ExtendableError
 */
class InvalidConfigError extends error.ExtendableError {}
module.exports.InvalidConfigError = InvalidConfigError;

/**
 * Error for handling instances where a config entry is bad
 * @class ConfigEntryError
 * @member config
 * @extends ExtendableError
 */
class ConfigEntryError extends error.ExtendableError {}
module.exports.ConfigEntryError = ConfigEntryError;
