import * as express from "express";

import { IController, INJECTABLES } from "../controller/index";
import { container } from "./inversify.config";

class App {
    public express: express.Application;
    private controller: IController;

    constructor() {
        // save a copy of express as a class member for convenience
        this.express = express();

        // inject the controller to use
        this.controller = container.get<IController>(INJECTABLES.Controller);

        // get the router and add the API implementation
        const router = express.Router();

        router.get("/status", (req, res, next) => {
            const json = JSON.stringify(this.controller.getSnapshot());
            res.json(json);
        });

        // start the controller: this initialises digital outputpins and starts the environment polling
        this.controller.start();

        // tell express to use the router for the API
        this.express.use("/api/", router);

        // tell express to use the wwwroot folder for serving staic files
        this.express.use(express.static("wwwroot"));
    }
}

// create the app and export it
export default new App().express;
