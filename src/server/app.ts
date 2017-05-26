import * as express from "express";

import { IController, IControllerSettings, INJECTABLES } from "../controller/index";
import { Snapshot } from "../controller/snapshots/snapshot";
import { container } from "./inversify.config";

class App {
    public express: express.Application;
    private controller: IController;
    private settings: IControllerSettings;

    constructor() {
        // save a copy of express as a class member for convenience
        this.express = express();

        // inject the controller to use
        this.controller = container.get<IController>(INJECTABLES.Controller);
        this.settings = container.get<IControllerSettings>(INJECTABLES.ControllerSettings);

        // get the router and add the API implementation
        const router = express.Router();

        router.get("/status", (req, res, next) => {
            const snapshot: Snapshot = this.controller.getSnapshot();

            // define of API response
            const result: any = {
                control: {
                    heating: snapshot.control.heating,
                    water: snapshot.control.hotWater,
                },
                env: {
                    hwTemp: snapshot.environment.hwTemperature,
                },
                program: {
                    hwmax: snapshot.program.maxHwTemp,
                    hwmin: snapshot.program.minHwTemp,
                    slots: snapshot.program.slots,
                    slotsPerDay: this.settings.slotsPerDay,
                },
            };

            res.json(result);
        });

        // start the controller: this initialises digital outputpins and starts the environment polling
        this.controller.start();

        this.express.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        // tell express to use the router for the API
        this.express.use("/api/", router);

        // tell express to use the wwwroot folder for serving staic files
        this.express.use(express.static("wwwroot"));
    }
}

// create the app and export it
export default new App().express;
