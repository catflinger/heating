import { Router } from "@types/express";

import { IClock, IController, IControllerSettings, Snapshot } from "../../controller/types";

export class ControlApi {

    public static addRoutes(router: Router, controller: IController, settings: IControllerSettings, clock: IClock): void {

        router.post("/control/override/set", (req, res, next) => {

            controller.setOverride(clock.currentSlot, 5, true);

            // define of API response
            const result: any = { result: "OK"};
            res.json(result);
        });

        router.post("/control/override/clear", (req, res, next) => {

            controller.clearOverride();

            // define of API response
            const result: any = { result: "OK"};
            res.json(result);
        });
    }
}
