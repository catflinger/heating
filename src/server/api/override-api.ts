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

        router.get("/override", (req, res, next) => {
            debug("GET: override");
            try {
                // define of API response
                return res.json({ items: this.controller.getSnapshot().controller.overridesToStoreable() });
            } catch (e) {
                return res.status(500).send("could not process this request " + e);
            }
        });

        router.put("/override", (req, res, next) => {
            debug("PUT: override");
            try {
                // validate the data
                const duration: number = Validate.isNumber(req.body.duration, "Invalid data for heating boost duration");

                if (isNaN(duration) || !isFinite(duration) || duration < 0) {
                    return res.status(400).send("value out of range for override duration");
                }

                try {
                    this.controller.setOverride(duration);

                    // define of API response
                    const result: any = {
                        result: "OK",
                    };

                    this.utils.dumpTextFile("override-set.json", JSON.stringify(result));

                    return res.json(result);

                } catch (e) {
                    return res.status(500).send("could not process this request " + e);
                }
            } catch (e) {
                return res.status(401).send("could not process this request " + e);
            }
        });

        router.delete("/override", (req, res, next) => {
            debug("DELETE: override");
            try {
                this.controller.clearOverride();

                // define of API response
                const result: any = {
                    result: "OK",
                };

                this.utils.dumpTextFile("override-delete.json", JSON.stringify(result));

                return res.json(result);

            } catch (e) {
                return res.status(500).send("could not process this request " + e);
            }
        });
    }
}
