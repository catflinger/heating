import * as Debug from "debug";
import * as http from "http";
import expressApp from "./server/app";

// const port = normalizePort(process.env.PORT || 3000);
const port = 3000;
const debug = Debug("app");

expressApp.set("port", port);

const server = http.createServer(expressApp);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = (typeof port === "string") ? "Pipe " + port : "Port " + port;
    switch (error.code) {
        case "EACCES":
            debug(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            debug(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening(): void {
    const addr = server.address();
    const bind = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr.port}`;
    debug("Listening on port 3000");
}

// function normalizePort(val: number|string): number|string|boolean {
//   let port: number = (typeof val === "string") ? parseInt(val, 10) : val;
//   if (isNaN(port)) return val;
//   else if (port >= 0) return port;
//   else return false;
// }
