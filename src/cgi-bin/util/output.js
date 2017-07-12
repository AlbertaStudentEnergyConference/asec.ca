/**
 * This file defines functions for outputting
 * @file output.js
 * @namespace util.output
 * @author Mitchell Sawatzky
 * @since June 10, 2017
 * @copyright Alberta Student Energy Conference, 2017
 */

const error = require(`${__rootname}/util/error`);

/**
 * Write data directly to stdout, for CGI output
 * @function write
 * @member util.output
 * @throws {UnhandledTypeError} when and unimplemented type is passed.
 * @param {Arguments} - Any number of arguments. to be written to stdout, newline separated. If an array is supplied,
 *     each element is written separately.
 * @returns {undefined}
 */
module.exports.write = function () {
    for (let param of arguments) {
        switch (typeof param) {
            case "number":
            case "string":
                process.stdout.write(param);
                break;
            case "object":
                if (param instanceof Array) {
                    for (let elem of param) {
                        module.exports.write(elem);
                    }
                    break;
                }
                // falls through if object isn't array
            default:
                throw new error.UnhandledTypeError(`Cannot write object of type ${typeof param}`);
        }
        process.stdout.write("\n");
    }
}
