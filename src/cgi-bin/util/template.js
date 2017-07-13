/**
 * Utilities for loading and processing templates
 * @file template.js
 * @namespace template
 * @author Mitchell Sawatzky
 * @since July 12, 2017
 * @copyright Alberta Student Energy Conference, 2017
 */

const fs = require("fs");
const templater = require("es6-template-strings");
const path = require("path");

const error = require(`${__rootname}/util/error`);

class TemplateNotFoundError extends error.ExtendableError {}
class IncompleteTemplateError extends error.ExtendableError {}

module.exports.get = function (templateFile, context) {
    let file, out;

    context = context || {};

    try {
        file = fs.readFileSync(path.resolve(`${__rootname}/../templates/${templateFile}`)).toString("utf-8");
    } catch (e) {
        throw new TemplateNotFoundError(path.resolve(`${__rootname}/../templates/${templateFile}`));
    }

    try {
        out = templater(file, context);
    } catch (e) {
        if (e instanceof TypeError) {
            throw new IncompleteTemplateError(e.message);
        }
        throw e;
    }

    return out;
};
