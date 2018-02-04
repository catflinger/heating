"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Debug = require("debug");
var http = require("http");
var app_1 = require("./server/app");
var port = 3000;
var debug = Debug("app");
app_1.default.set("port", port);
var server = http.createServer(app_1.default);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    var bind = (typeof port === "string") ? "Pipe " + port : "Port " + port;
    switch (error.code) {
        case "EACCES":
            debug(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            debug(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    var addr = server.address();
    var bind = (typeof addr === "string") ? "pipe " + addr : "port " + addr.port;
    debug("Listening on port 3000");
}
