import * as Debug from "debug";
import { Router } from "express";
import { inject, injectable } from "inversify";

import { Utils } from "../../common/utils";
import {
    IApi,
    ILogger,
    INJECTABLES,
} from "../../controller/types";

const debug = Debug("app");

@injectable()
export class LoggerApi implements IApi {

    @inject(INJECTABLES.Utils)
    private utils: Utils;

    @inject(INJECTABLES.Logger)
    private logger: ILogger;

    public addRoutes(router: Router): void {

        router.get("/log", (req, res, next) => {
            debug("GET: log");

            try {
                res.sendFile(this. logger.getLogfileName());
            } catch (e) {
                res.status(500).send("could not process this request " + e);
            }
        });

        router.delete("/log", (req, res, next) => {
            debug("DELETE: sensor/:sensor_id");

            try {
                throw new Error("api not implemented yet!");
            } catch (e) {
                return res.status(500).send("could not process this request " + e);
            }
        });
    }
}
