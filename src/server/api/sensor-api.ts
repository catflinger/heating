import * as Debug from "debug";
import { Router } from "express";
import { inject, injectable } from "inversify";

import { Utils } from "../../common/utils";
import {
    IApi,
    IEnvironment,
    INJECTABLES,
} from "../../controller/types";

const debug = Debug("app");

// this API is a front for the Environment class - reading temperature sensor values
// for getting and setting sensor configuration use the sensor-config API and the EnvironmentSettings class

@injectable()
export class SensorApi implements IApi {

    @inject(INJECTABLES.Utils)
    private utils: Utils;

    @inject(INJECTABLES.Environment)
    private environment: IEnvironment;

    public addRoutes(router: Router): void {

        router.get("/sensor", (req, res, next) => {
            debug("GET: sensors");

            try {
                const result = {
                    items: this.environment.getSnapshot(),
                };

                this.utils.dumpTextFile("sensors.json", JSON.stringify(result));
                res.json(result);

            } catch (e) {
                res.status(500).send("could not process this request " + e);
            }
        });

        router.get("/sensor/:sensor_id", (req, res, next) => {
            debug("GET: sensor/:sensor_id");

            const sensorId: string = req.params.sensor_id;

            try {
                res.json(this.environment.getSensor(sensorId));
            } catch (e) {
                return res.status(500).send("could not process this request " + e);
            }
        });

    }
}
