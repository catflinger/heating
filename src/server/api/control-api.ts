import * as Debug from "debug";
import { Router } from "express";
import { inject, injectable } from "inversify";

import { Validate } from "../../common/validate";
import { IApi, IController, INJECTABLES } from "../../controller/types";

const debug = Debug("app");

@injectable()
export class ControlApi implements IApi {
    @inject(INJECTABLES.Controller)
    private controller: IController;

    public addRoutes(router: Router): void {

        router.post("/control/override/set", (req, res, next) => {
            debug("POST: boost set");

            const duration: number = Validate.isNumber(req.body.duration, "Invalid data for heating boost duration");

            if (isNaN(duration) || !isFinite(duration) || duration < 0) {
                throw new Error("value out of range for override duration");
            }

            this.controller.setOverride(duration);

            // define of API response
            const result: any = { result: "OK"};
            res.json(result);

        });

        router.post("/control/override/clear", (req, res, next) => {
            debug("POST: override clear");

            this.controller.clearOverride();

            // define of API response
            const result: any = { result: "OK"};
            res.json(result);
        });
    }
}
