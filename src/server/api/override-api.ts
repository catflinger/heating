import * as Debug from "debug";
import { Router } from "express";
import { inject, injectable } from "inversify";

import { Utils } from "../../common/utils";
import { Validate } from "../../common/validate";
import { IApi, IController, INJECTABLES } from "../../controller/types";

const debug = Debug("app");

@injectable()
export class OverrideApi implements IApi {

    @inject(INJECTABLES.Controller)
    private controller: IController;

    @inject(INJECTABLES.Utils)
    private utils: Utils;

    public addRoutes(router: Router): void {

        router.get("/override/:id", (req, res, next) => {
            debug("GET/id: override");

            // define of API response
            res.json(this.controller.getSnapshot().override);
        });

        router.get("/override", (req, res, next) => {
            debug("GET: override");

            // define of API response
            res.json({ overrides: [this.controller.getSnapshot().override] });
        });

        router.post("/override/:id", (req, res, next) => {
            debug("POST: boost set");

            /* body content -
            {
                "status": 1,
                "duration": 4
            }
            */

            const duration: number = Validate.isNumber(req.body.duration, "Invalid data for heating boost duration");

            if (isNaN(duration) || !isFinite(duration) || duration < 0) {
                res.status(400).send("value out of range for override duration");
            } else {
                this.controller.setOverride(duration);

                // define of API response
                const result: any = { result: "OK"};
                this.utils.dumpTextFile("override-set.json", JSON.stringify(result));
                res.json(result);
            }
        });

        router.post("/override/*", (req, res, next) => {
            res.status(405).send("method not allowed");
        });
        router.put("/override/*", (req, res, next) => {
            res.status(405).send("method not allowed");
        });
        router.delete("/override/*", (req, res, next) => {
            res.status(405).send("method not allowed");
        });
    }
}
