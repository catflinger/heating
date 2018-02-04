import * as bodyParser from "body-parser";
import * as Debug from "debug";
import * as express from "express";
import { inject, injectable } from "inversify";

import { ControlApi } from "./api/control-api";
import { ProgramApi } from "./api/program-api";
import { StatusApi } from "./api/status-api";

import { Controller } from "../controller/controller";
import { Snapshot } from "../controller/snapshots/snapshot";
import { IApi, IController, INJECTABLES } from "../controller/types";
import { container } from "../inversify.config.dev";

const debug = Debug("app");

class App {
    public express: express.Application;

    private controller: IController;
    private controlApi: IApi;
    private statusApi: IApi;
    private programApi: IApi;

    constructor() {
        this.controller = container.get<IController>(INJECTABLES.Controller);
        this.controlApi = container.get<IApi>(INJECTABLES.ControlApi);
        this.programApi = container.get<IApi>(INJECTABLES.ProgramApi);
        this.statusApi = container.get<IApi>(INJECTABLES.StatusApi);
    }

    public start(): express.Application {
        // save a copy of express as a class member for convenience
        this.express = express();

        // get the router and add the API implementation
        const router: express.Router = express.Router();

        this.statusApi.addRoutes(router);
        this.controlApi.addRoutes(router);
        this.programApi.addRoutes(router);

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

export default new App().start();
