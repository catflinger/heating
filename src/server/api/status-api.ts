import * as Debug from "debug";
import { Router } from "express";
import { inject, injectable } from "inversify";

import { Utils } from "../../common/utils";
import { IApi, IController, INJECTABLES, SummarySnapshot } from "../../controller/types";

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
                const snapshot: SummarySnapshot = this.controller.getSnapshot();

                // define of API response as a wrapped array
                const result: any = {
                    items: [
                        {
                            id: "control",
                            snapshot: snapshot.control.toStorable(),
                        },
                        {
                            id: "device",
                            snapshot: snapshot.device.toStorable(),
                        },
                        {
                            id: "activeProgram",
                            snapshot: snapshot.controller.activeProgram.toStorable(),
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
            this.sendGetResponse(this.controlResponse, req, res, next);
        });

        router.get("/status/device", (req, res, next) => {
            this.sendGetResponse(this.deviceResponse, req, res, next);
        });

        router.get("/status/activeProgram", (req, res, next) => {
            this.sendGetResponse(this.activeProgramResponse, req, res, next);
        });
    }

    private sendGetResponse(write: (snapshot: SummarySnapshot) => any, req: any, res: any, next: any): void {
        debug("GET: system status");

        res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
        res.header("Expires", "-1");
        res.header("Pragma", "no-cache");

        try {
            const snapshot: SummarySnapshot = this.controller.getSnapshot();

            // define of API response as a plain object
            const result = write(snapshot);

            // send the response
            this.utils.dumpTextFile("status.json", result);
            return res.json(result);

        } catch (e) {
            return res.status(500).send("could not process this request " + e);
        }
    }

    private controlResponse(snapshot: SummarySnapshot): any {
        return snapshot.control.toStorable();
    }

    private deviceResponse(snapshot: SummarySnapshot): any {
        return snapshot.device.toStorable();
    }

    private activeProgramResponse(snapshot: SummarySnapshot): any {
        return snapshot.controller.activeProgram.toStorable();
    }
}
