import * as bodyParser from "body-parser";
import * as Debug from "debug";
import * as express from "express";
import { Container, inject, injectable } from "inversify";

import { ProgramApi } from "./api/program-api";
import { ProgramConfigApi } from "./api/program-config-api";
import { StatusApi } from "./api/status-api";

import { Controller } from "../controller/controller";
import { Snapshot } from "../controller/snapshots/snapshot";
import { IApi, IController, INJECTABLES } from "../controller/types";

const debug = Debug("app");

@injectable()
export class App {
    public express: express.Application;

    constructor(
        @inject(INJECTABLES.Controller) private controller: IController,
        @inject(INJECTABLES.ProgramConfigApi) private configApi: IApi,
        @inject(INJECTABLES.StatusApi) private statusApi: IApi,
        @inject(INJECTABLES.ProgramApi) private programApi: IApi,
        @inject(INJECTABLES.OverrideApi) private overrideApi: IApi,
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

        // start the controller: this initialises digital outputpins and starts the environment polling
        this.controller.start();

        this.express.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        this.express.use(bodyParser.json({
            limit: 100,
        }));

        // tell express to use the router for the API
        this.express.use("/api/", router);

        // tell express to use the wwwroot folder for serving staic files
        const wwwroot: string = __dirname + "/../../../wwwroot";
        this.express.use(express.static(wwwroot));
        debug("Serving static content from " + wwwroot);

        return this.express;
    }
}
