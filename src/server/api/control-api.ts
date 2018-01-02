import * as Debug from "debug";
import { Router } from "express";

import { Validate } from "../../common/validate";
import { IController } from "../../controller/types";

const debug = Debug("app");

export class ControlApi {

    public static addRoutes(router: Router, controller: IController): void {

        router.post("/control/boost", (req, res, next) => {
            debug("POST: boost set");

            const duration: number = Validate.isNumber(req.body.duration, "Invalid data for heating boost duration");

            if (isNaN(duration) || !isFinite(duration) || duration < 0) {
                throw new Error("value out of range for override duration");
            }

            controller.setOverride(duration);

            // define of API response
            const result: any = { result: "OK"};
            res.json(result);

        });

        router.post("/control/override/clear", (req, res, next) => {
            debug("POST: override clear");

            controller.clearOverride();

            // define of API response
            const result: any = { result: "OK"};
            res.json(result);
        });
    }
}
