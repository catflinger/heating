import * as Debug from "debug";
import { Router } from "express";
import { inject, injectable } from "inversify";

import { Utils } from "../../common/utils";
import {
    IApi,
    IEnvironment,
    IEnvironmentSettings,
    INJECTABLES,
} from "../../controller/types";

const debug = Debug("app");

@injectable()
export class SensorConfigApi implements IApi {

    @inject(INJECTABLES.Utils)
    private utils: Utils;

    @inject(INJECTABLES.EnvironmentSettings)
    private environmentSettings: IEnvironmentSettings;

    public addRoutes(router: Router): void {

        router.get("/sensor-config", (req, res, next) => {
            debug("GET: sensors");

            try {
                const result = this.environmentSettings.sensorSettings;

                this.utils.dumpTextFile("sensor-config.json", JSON.stringify(result));
                res.json(result);

            } catch (e) {
                res.status(500).send("could not process this request " + e);
            }
        });

        router.put("/sensor-config", (req, res, next) => {
            debug("PUT: sensor/:sensor_id");

            try {
                throw new Error("sensor-config:PUT api not implemented yet!");
            } catch (e) {
                return res.status(500).send("could not process this request " + e);
            }
        });
    }
}
