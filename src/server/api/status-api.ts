import * as Debug from "debug";
import { Router } from "express";
import { inject, injectable } from "inversify";

import { Utils } from "../../common/utils";
import {
    ControlStateSnapshot,
    IApi,
    IClock,
    IController,
    IEnvironment,
    INJECTABLES,
    IOverrideManager,
    IProgramManager,
    ISwitchable,
 } from "../../controller/types";

const debug = Debug("app");

@injectable()
export class StatusApi implements IApi {

    @inject(INJECTABLES.Controller)
    private controller: IController;

    @inject(INJECTABLES.ProgramManager)
    private programManager: IProgramManager;

    @inject(INJECTABLES.OverrideManager)
    private ovManager: IOverrideManager;

    @inject (INJECTABLES.Boiler)
    private boiler: ISwitchable;

    @inject (INJECTABLES.CHPump)
    private chPump: ISwitchable;

    @inject (INJECTABLES.HWPump)
    private hwPump: ISwitchable;

    @inject(INJECTABLES.Utils)
    private utils: Utils;

    @inject(INJECTABLES.Environment)
    private env: IEnvironment;

    @inject(INJECTABLES.SlotsPerDay)
    private slotsPerDay: number;

    @inject(INJECTABLES.Clock)
    private clock: IClock;

    public addRoutes(router: Router): void {

        router.get("/status", (req, res, next) => {
            debug("GET: system status");

            res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
            res.header("Expires", "-1");
            res.header("Pragma", "no-cache");

            const controlSnapshot: ControlStateSnapshot = this.controller.getSnapshot();

            try {
                // define of API response as a wrapped array
                const result: any = {
                    items: [
                        {
                            id: "control",
                            snapshot: {
                                heating: controlSnapshot.heating,
                                hotWater: controlSnapshot.hotWater,
                            },
                        },
                        {
                            id: "device",
                            snapshot: {
                                boiler: this.boiler.getState(),
                                chPump: this.chPump.getState(),
                                hwPump: this.hwPump.getState(),
                            },
                        },
                        {
                            id: "activeProgram",
                            snapshot: this.programManager.getCurrentProgram(),
                        },
                        {
                            id: "overrides",
                            snapshot: this.ovManager.getSnapshot(),
                        },
                        {
                            id: "env",
                            snapshot: this.env.getSnapshot(),
                        },
                    ],
                    setup: {
                        currentSlot: this.clock.currentSlot,
                        datetime: Date.now(),
                        slotsPerDay: this.slotsPerDay,
                    },
                };

                // send the response
                this.utils.dumpTextFile("status.json", JSON.stringify(result, null, 1));

                return res.json(result);

            } catch (e) {
                return res.status(500).send("could not process this request " + e);
            }
        });

        router.get("/status/control", (req, res, next) => {
            this.sendGetResponse(this.controller.getSnapshot(), req, res, next);
        });

        router.get("/status/device", (req, res, next) => {
            this.sendGetResponse(
                {
                    id: "device",
                    snapshot: {
                        boiler: this.boiler.getState(),
                        chPump: this.chPump.getState(),
                        hwPump: this.hwPump.getState(),
                    },
                },
                req,
                res,
                next);
        });

        router.get("/status/activeProgram", (req, res, next) => {
            this.sendGetResponse(
                {
                    id: "activeProgram",
                    snapshot: this.programManager.getCurrentProgram(),
                },
                req,
                res,
                next);
        });
    }

    private sendGetResponse(result: any, req: any, res: any, next: any): void {
        debug("GET: system status");

        res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
        res.header("Expires", "-1");
        res.header("Pragma", "no-cache");

        try {
            // send the response
            this.utils.dumpTextFile("status.json", JSON.stringify(result));

            return res.json(result);

        } catch (e) {
            return res.status(500).send("could not process this request " + e);
        }
    }
}
