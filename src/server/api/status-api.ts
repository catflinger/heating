import { Router } from "@types/express";

import { IClock, IController, IControllerSettings, Snapshot } from "../../controller/types";

export class StatusApi {

    public static addRoutes(router: Router, controller: IController, settings: IControllerSettings, clock: IClock): void {
        router.get("/status", (req, res, next) => {

            try {
                const snapshot: Snapshot = controller.getSnapshot();

                // define of API response
                const result: any = {
                    control: {
                        heating: snapshot.control.heating,
                        water: snapshot.control.hotWater,
                    },
                    env: {
                        hwTemp: snapshot.environment.hwTemperature,
                    },
                    program: {
                        hwmax: snapshot.program.maxHwTemp,
                        hwmin: snapshot.program.minHwTemp,
                        slots: snapshot.program.slots,
                        slotsPerDay: settings.slotsPerDay,
                    },
                };
                res.json(result);

            } catch (e) {
                res.status(500).send("could not process this request " + e);
            }

        });
    }
}
