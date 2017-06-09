import { Router } from "@types/express";
import * as Debug from "debug";

import { IController, Snapshot } from "../../controller/types";

const debug = Debug("app");

export class StatusApi {

    public static addRoutes(router: Router, controller: IController): void {

        router.get("/status", (req, res, next) => {
            debug("GET: system status");

            res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
            res.header("Expires", "-1");
            res.header("Pragma", "no-cache");

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
                    override: snapshot.override ? {
                        date: snapshot.override.date,
                        duration: snapshot.override.duration,
                        start: snapshot.override.start,
                        state: snapshot.override.state,
                    } : null,
                    program: {
                        hwmax: snapshot.program.maxHwTemp,
                        hwmin: snapshot.program.minHwTemp,
                        slots: snapshot.program.slots,
                        slotsPerDay: snapshot.program.slotsPerDay,
                    },
                };
                res.json(result);

            } catch (e) {
                res.status(500).send("could not process this request " + e);
            }
        });
    }
}
