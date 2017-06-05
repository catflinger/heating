import * as bodyParser from "body-parser";
import * as express from "express";
import { inject } from "inversify";

import { IClock, IController, IControllerSettings, INJECTABLES } from "../controller/index";
import { Snapshot } from "../controller/snapshots/snapshot";
import { ControlApi } from "./api/control-api";
import { StatusApi } from "./api/status-api";
import { container } from "./inversify.config";

class App {
    public express: express.Application;

    public start(): express.Application {
        // save a copy of express as a class member for convenience
        this.express = express();

        // get the router and add the API implementation
        const router: express.Router = express.Router();
        const controller: IController = container.get<IController>(INJECTABLES.Controller);
        const controllerSettings: IControllerSettings = container.get<IControllerSettings>(INJECTABLES.ControllerSettings);
        const clock: IClock = container.get<IClock>(INJECTABLES.Clock);

        StatusApi.addRoutes(router, controller, controllerSettings, clock);
        ControlApi.addRoutes(router, controller, controllerSettings, clock);

        // start the controller: this initialises digital outputpins and starts the environment polling
        controller.start();

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
        this.express.use(express.static("wwwroot"));

        return this.express;
    }
}

// create the app and export it
export default new App().start();
