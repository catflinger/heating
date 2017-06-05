import { Router } from "@types/express";
import * as Debug from "debug";

import { Validate } from "../../common/validate";
import { IClock, IController, IControllerSettings, Snapshot } from "../../controller/types";

const debug = Debug("app");

export class ControlApi {

    public static addRoutes(router: Router, controller: IController, settings: IControllerSettings, clock: IClock): void {

        router.post("/control/override/set", (req, res, next) => {
            debug("POST: override set");

            const state: boolean = Validate.isBoolean(req.body.state, "Invalid data for override state");
            const duration: number = Validate.isNumber(req.body.duration, "Invalid data for override state");

            controller.setOverride(clock.currentSlot, duration, state);

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
