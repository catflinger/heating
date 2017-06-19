import { Router } from "@types/express";
import * as Debug from "debug";

import { IController, Snapshot } from "../../controller/types";

const debug = Debug("app");

export class ProgramApi {

    public static addRoutes(router: Router, controller: IController): void {

        router.get("/program", (req, res, next) => {
            debug("GET: program");
            res.status(500).send("Program listing API not implemented yet. ");
        });

        router.get("/program/:program_id", (req, res, next) => {
            debug("GET: program:program_id");

            res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
            res.header("Expires", "-1");
            res.header("Pragma", "no-cache");

            const programId: string = req.params.program_id;

            if (programId === "0") {

                try {
                    const snapshot: Snapshot = controller.getSnapshot();

                    // define of API response
                    const result: any = {
                        hwmax: snapshot.program.maxHwTemp,
                        hwmin: snapshot.program.minHwTemp,
                        id: 0,
                        name: "curernt program",
                        slots: snapshot.program.slots,
                        slotsPerDay: snapshot.program.slotsPerDay,
                    };
                    res.json(result);

                } catch (e) {
                    res.status(500).send("could not process this request " + e);
                }
            } else {
                res.status(404).send("Program not found.");
            }
        });

        router.post("/program", (req, res, next) => {
            debug("POST: program");

            // TO DO: implement the changes

            // TO DO: return the new program

            res.status(500).send("Not implemented yet. ");
        });

        router.put("/program/:program_id", (req, res, next) => {
            debug("PUT: program");

            // TO DO: implement the changes

            res.status(500).send("Not implemented yet. ");
        });

        router.post("/program/:program_id", (req, res, next) => {
            debug("POST: program");

            // TO DO: implement the changes

            res.status(500).send("Not implemented yet. ");
        });

        router.delete("/program/:program_id", (req, res, next) => {
            debug("DELETE: program");

            // TO DO: implement the changes

            res.status(500).send("Not implemented yet. ");
        });
    }
}
