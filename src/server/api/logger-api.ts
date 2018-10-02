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
                this.logger.getLogList((err, list) => {
                    if (!err) {
                        res.json(list);
                    } else {
                        res.status(500).send("could not get a log file list");
                    }
                });
            } catch (e) {
                res.status(500).send("could not process this request " + e);
            }
        });

        router.get("/log/:id", (req, res, next) => {
            debug("GET: log/:id");

            try {
                if (req.params.id === "current.csv") {
                    res.sendFile(this. logger.getLogfileName());
                    return;
                } else {
                    throw new Error("retrieval by id not implemented yet!");
                }
            } catch (e) {
                res.status(500).send("could not process this request " + e);
            }
        });

        router.delete("/log/:id", (req, res, next) => {
            debug("DELETE: log/:id");

            try {
                throw new Error("log delete not implemented yet!");
            } catch (e) {
                return res.status(500).send("could not process this request " + e);
            }
        });
    }
}
