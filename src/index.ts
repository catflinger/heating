import * as Debug from "debug";
import * as http from "http";
import { Container } from "inversify";

import { INJECTABLES } from "./controller/types";
import { App } from "./server/app";

let container: Container;

container = (process.env.NODE_ENV === "production") ?
     require("./inversify.config").container :
     require("./inversify.config.dev").container;

const port = container.get<number>(INJECTABLES.ExpressPortNumber);
const debug = Debug("app");

const expressApp = container.get<App>(INJECTABLES.App).start();

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
    debug("Listening on port " + port);
}
