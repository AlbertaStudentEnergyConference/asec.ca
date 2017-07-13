/**
 * Take over the process and spit out an error message
 * @file crashDump.js
 * @namespace crashDump
 * @author Mitchell Sawatzky
 * @since July 12, 2017
 * @copyright Alberta Student Energy Conference, 2017
 */

module.exports.dump = function (stack) {
    let mailBody = `ASEC encountered an error.
----------
REQUEST_ID: ${process.env.REQUEST_ID ? process.env.REQUEST_ID : 'unknown'}
REQUEST_URI: ${process.env.REQUEST_URI ? process.env.REQUEST_URI : 'unknown'}
REQUEST_METHOD: ${process.env.REQUEST_METHOD ? process.env.REQUEST_METHOD : 'unknown'}
Stack Trace:
${stack}
    `;
    process.stdout.write(`status: 500 Internal Server Error
content-type: text/html

<!DOCTYPE html>
<html>
    <head>
        <title> ASEC has encountered an error </title>
        <style>

        </style>
    </head>
    <body>
        <div id="site">
            <h1>Rats!</h1>
            <h3>ASEC has encountered an error. This has been logged, but feel free to send an email to
                <a href="mailto:it@asec.ca?subject=ASEC%20encountered%20an%20error&body=${encodeURIComponent(mailBody)}">it@asec.ca</a>.</h3>
            <pre id="stacktrace">
${stack}
            </pre>
        </div>
    </body>
</html>`);
}
