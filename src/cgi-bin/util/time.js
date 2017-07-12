/**
 * Time utilities
 * @file time.js
 * @namespace utils.time
 * @author Mitchell Sawatzky
 * @since June 10, 2017
 * @copyright Alberta Student Energy Conference, 2017
 */

// This will allow us to naively pad numbers
Number.prototype.pad = function (n) {
    if (this.toString().length >= n) {
        return this.toString();
    }
    return (new Array(n + 1).join('0') + this).slice(-n);
}

module.exports.timestamp = function () {
    var d = new Date();
    return `${d.getDate().pad(2)}/${(d.getMonth() + 1).pad(2)}/${d.getFullYear().pad(4)} `
        + `${d.getHours().pad(2)}:${d.getMinutes().pad(2)}:${d.getSeconds().pad(2)}.${d.getMilliseconds().pad(3)}`;
}
