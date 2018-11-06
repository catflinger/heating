import * as Debug from "debug";
import { Router } from "express";
import { inject, injectable } from "inversify";

import { Utils } from "../../common/utils";
import { Sensor } from "../../controller/sensor";
import {
    IApi,
    IEnvironment,
    IEnvironmentSettings,
    INJECTABLES,
} from "../../controller/types";

const debug = Debug("app");

// this API is a front for the EnvironmentSettings class - reading and writing configuration of sensors
// for reading sensor values use the Environment API and the Environment class

@injectable()
export class SensorConfigApi implements IApi {

    @inject(INJECTABLES.Utils)
    private utils: Utils;

    @inject(INJECTABLES.EnvironmentSettings)
    private environmentSettings: IEnvironmentSettings;

    @inject(INJECTABLES.Environment)
    private environment: IEnvironment;

    public addRoutes(router: Router): void {

        router.get("/sensor-config", (req, res, next) => {
            debug("GET: sensor-config");

            try {
                const result = this.environmentSettings.getSensorSettings();

                this.utils.dumpTextFile("sensor-config.json", JSON.stringify(result));
                return res.json(result);

            } catch (e) {
                return res.status(500).send("could not process this request " + e);
            }
        });

        router.get("/sensor-config/:id", (req, res, next) => {
            debug("GET: sensor-config/:id");

            try {
                const result = this.environmentSettings.getSensorSetting(req.params.id);

                if (result) {
                    this.utils.dumpTextFile("sensor-config-id.json", JSON.stringify(result));
                    return res.json(result);
                } else {
                    return res.status(404).send("sensor not found");
                }
            } catch (e) {
                return res.status(500).send("could not process this request " + e);
            }
        });

        router.post("/sensor-config/:sensor_id", (req, res, next) => {
            debug("POST: sensor-config/:sensor_id");

            try {
                const id = req.params.sensor_id;
                const data: any = req.body;

                if (!data.id) {
                    return res.status(400).send("sensor id missing in request ");
                }

                if (id !== data.id) {
                    return res.status(400).send("sensor id mismatch between url and body");
                }

                if (!data.description || typeof data.description !== "string") {
                    return res.status(400).send("sensor description missing in request ");
                }

                if (typeof data.role !== "string") {
                    return res.status(400).send("sensor role missing in request ");
                }

                this.environmentSettings.updateSensorSetting(new Sensor("", data.id, data.description, data.role));
                this.environment.reloadSensors();

                return res.status(200).send(true);

            } catch (e) {
                return res.status(500).send("could not process this request ");
            }
        });

        router.delete("/sensor-config/:id", (req, res, next) => {
            debug("DELETE: sensor-config/:id");

            try {
                const id = req.params.id;

                this.environmentSettings.removeSensorSetting(id);
                this.environment.reloadSensors();
                return res.status(200).send(true);

            } catch (e) {
                return res.status(500).send("could not process this request " + e);
            }
        });

    }
}
