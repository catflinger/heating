import * as Debug from "debug";
import { Router } from "express";
import { inject, injectable } from "inversify";

import { Utils } from "../../common/utils";
import { IApi, IController, INJECTABLES, Snapshot } from "../../controller/types";

const debug = Debug("app");

@injectable()
export class StatusApi implements IApi {

    @inject(INJECTABLES.Controller)
    private controller: IController;

    @inject(INJECTABLES.Utils)
    private utils: Utils;

    public addRoutes(router: Router): void {

        router.get("/status", (req, res, next) => {
            debug("GET: system status");

            res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
            res.header("Expires", "-1");
            res.header("Pragma", "no-cache");

            try {
                const snapshot: Snapshot = this.controller.getSnapshot();

                // define of API response as a wrapped array
                const result: any = { items: [] };

                result.items.push(this.controlResponse(snapshot));
                result.items.push(this.deviceResponse(snapshot));
                result.items.push(this.envResponse(snapshot));
                result.items.push(this.overrideResponse(snapshot));
                result.items.push(this.programResponse(snapshot));

                // send the response
                this.utils.dumpTextFile("status.json", result);

                return res.json(result);

            } catch (e) {
                return res.status(500).send("could not process this request " + e);
            }
        });

        router.get("/status/control", (req, res, next) => {
            this.sendGetResponse(this.controlResponse, req, res, next);
        });

        router.get("/status/env", (req, res, next) => {
            this.sendGetResponse(this.envResponse, req, res, next);
        });

        router.get("/status/device", (req, res, next) => {
            this.sendGetResponse(this.deviceResponse, req, res, next);
        });

        router.get("/status/override", (req, res, next) => {
            this.sendGetResponse(this.overrideResponse, req, res, next);
        });

        router.get("/status/program", (req, res, next) => {
            this.sendGetResponse(this.programResponse, req, res, next);
        });
    }

    private sendGetResponse(write: (snapshot: Snapshot) => any, req: any, res: any, next: any): void {
        debug("GET: system status");

        res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
        res.header("Expires", "-1");
        res.header("Pragma", "no-cache");

        try {
            const snapshot: Snapshot = this.controller.getSnapshot();

            // define of API response as a plain object
            const result = write(snapshot);

            // send the response
            this.utils.dumpTextFile("status.json", result);
            return res.json(result);

        } catch (e) {
            return res.status(500).send("could not process this request " + e);
        }
    }

    private controlResponse(snapshot: Snapshot): any {
        return {
            id: "control",
            snapshot: {
                heating: snapshot.control.heating,
                water: snapshot.control.hotWater,
            },
        };
    }

    private deviceResponse(snapshot: Snapshot): any {
        return {
            id: "device",
            snapshot: {
                boiler: snapshot.device.boiler,
                chPump: snapshot.device.chPump,
                hwPump: snapshot.device.hwPump,
            },
        };
    }

    private envResponse(snapshot: Snapshot): any {
        return {
            id: "env",
            snapshot: {
                sensors: snapshot.environment.sensors,
            },
        };
    }

    private overrideResponse(snapshot: Snapshot): any {
        return {
            id: "override",
            snapshot: snapshot.override ? {
                date: snapshot.override.date,
                duration: snapshot.override.duration,
                start: snapshot.override.start,
                state: snapshot.override.state,
            } : null,
        };
    }

    private programResponse(snapshot: Snapshot): any {
        return {
            id: "program",
            snapshot: {
                hwmax: snapshot.program.maxHwTemp,
                hwmin: snapshot.program.minHwTemp,
                slots: snapshot.program.slots,
                slotsPerDay: snapshot.program.slotsPerDay,
            },
        };
    }
}
