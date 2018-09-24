import * as Debug from "debug";
import { Router } from "express";
import { inject, injectable } from "inversify";

import { Utils } from "../../common/utils";
import { IApi, IController, INJECTABLES, IOverrideManager, IProgramManager, ISwitchable } from "../../controller/types";

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

    public addRoutes(router: Router): void {

        router.get("/status", (req, res, next) => {
            debug("GET: system status");

            res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
            res.header("Expires", "-1");
            res.header("Pragma", "no-cache");

            try {
                // define of API response as a wrapped array
                const result: any = {
                    items: [
                        {
                            id: "control",
                            snapshot: this.controller.getSnapshot(),
                        },
                        {
                            id: "device",
                            snapshot: {
                                boiler: this.boiler.state,
                                chPump: this.chPump.state,
                                hwPump: this.hwPump.state,
                            },
                        },
                        {
                            id: "activeProgram",
                            snapshot: this.programManager.currentProgram,
                        },
                        {
                            id: "overrides",
                            snapshot: this.ovManager.getSnapshot(),
                        },
                ] };

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
                        boiler: this.boiler.state,
                        chPump: this.chPump.state,
                        hwPump: this.hwPump.state,
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
                    snapshot: this.programManager.currentProgram,
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
