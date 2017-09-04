/**
 * Processor for data supplied via stdin (IE: POST)
 * @file dataConsumer.js
 * @namespace dataConsumer
 * @author Mitchell Sawatzky
 * @since September 3, 2017
 * @copyright Alberta Student Energy Conference, 2017
 */

module.exports.consume = function (cb) {
    process.stdin.resume();
    process.stdin.setEncoding("utf-8");

    let data = "";
    log.debug("Starting to consume data");
    process.stdin.on("data", function (chunk) {
        if (data > 1e6) {
            data = "";
            process.stdout.write(`status: 413 Payload Too Large
content-type: text/plain

`);
            process.exit(0);
        }
        data += chunk;
    });

    process.stdin.on("end", function () {
        log.debug("Data consumed");
        log.debug(data);
        cb(null, data);
    });
}
