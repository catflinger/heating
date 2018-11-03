import * as bodyParser from "body-parser";
import * as Debug from "debug";
import * as express from "express";
import { Container, inject, injectable } from "inversify";
import * as path from "path";

import { ProgramApi } from "./api/program-api";
import { ProgramConfigApi } from "./api/program-config-api";
import { StatusApi } from "./api/status-api";

import { Controller } from "../controller/controller";
import { IApi, IController, ILogger, INJECTABLES } from "../controller/types";

const debug = Debug("app");

@injectable()
export class App {
    public express: express.Application;

    constructor(
        @inject(INJECTABLES.Controller) private controller: IController,
        @inject(INJECTABLES.Logger) private logger: ILogger,
        @inject(INJECTABLES.ProgramConfigApi) private configApi: IApi,
        @inject(INJECTABLES.StatusApi) private statusApi: IApi,
        @inject(INJECTABLES.ProgramApi) private programApi: IApi,
        @inject(INJECTABLES.OverrideApi) private overrideApi: IApi,
        @inject(INJECTABLES.SensorApi) private sensorApi: IApi,
        @inject(INJECTABLES.LogApi) private loggerApi: IApi,
        @inject(INJECTABLES.AppRootDir) private appRootDir: string,
    ) {}

    public start(): express.Application {
        // save a copy of express as a class member for convenience
        this.express = express();

        // get the router and add the API implementation
        const router: express.Router = express.Router();

        this.statusApi.addRoutes(router);
        this.configApi.addRoutes(router);
        this.programApi.addRoutes(router);
        this.overrideApi.addRoutes(router);
        this.sensorApi.addRoutes(router);
        this.loggerApi.addRoutes(router);

        // start the controller: this initialises digital outputpins and starts the environment polling
        this.controller.start();

        this.logger.writeLogEntry();
        this.logger.start();

        this.express.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "HEAD, GET, PUT, POST, DELETE, OPTIONS");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        this.express.use(bodyParser.json({
            limit: 10000,
        }));

        // tell express to use the router for the API
        this.express.use("/api/", router);

        // tell express to use the wwwroot folder for serving staic files
        const wwwroot: string = path.join(this.appRootDir, "wwwroot");
        this.express.use(express.static(wwwroot));
        debug("Serving static content from " + wwwroot);

        return this.express;
    }
}
