import * as Debug from "debug";
import { Router } from "express";
import { inject, injectable } from "inversify";

import { IApi, IController, INJECTABLES, Snapshot } from "../../controller/types";

const debug = Debug("app");

@injectable()
export class StatusApi implements IApi {
    @inject(INJECTABLES.Controller)
    private controller: IController;

    public addRoutes(router: Router): void {

        router.get("/status", (req, res, next) => {
            debug("GET: system status");

            res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
            res.header("Expires", "-1");
            res.header("Pragma", "no-cache");

            try {
                const snapshot: Snapshot = this.controller.getSnapshot();

                // define of API response
                const result: any = {
                    control: {
                        heating: snapshot.control.heating,
                        water: snapshot.control.hotWater,
                    },
                    device: {
                        boiler: snapshot.device.boiler,
                        chPump: snapshot.device.chPump,
                        hwPump: snapshot.device.hwPump,
                    },
                    env: {
                        sensors: snapshot.environment.sensors,
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
