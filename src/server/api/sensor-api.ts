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
                    items: this.environment.getSnapshot().sensorsToStoreable(),
                };

                this.utils.dumpTextFile("sensors.json", JSON.stringify(result));
                res.json(result);

            } catch (e) {
                res.status(500).send("could not process this request " + e);
            }
        });

        router.get("/sensor/:sensor_id", (req, res, next) => {
            debug("GET: sensor/:sensor_id");

            const programId: string = req.params.program_id;

            try {
                throw new Error("api not implemented yet!");

            } catch (e) {
                return res.status(500).send("could not process this request " + e);
            }
        });
    }
}
