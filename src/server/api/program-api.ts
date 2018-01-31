import * as Debug from "debug";
import { Router } from "express";

import { IProgram, IProgramManager } from "../../controller/types";

const debug = Debug("app");

export class ProgramApi {

    public static addRoutes(router: Router, programManager: IProgramManager): void {

        router.get("/program", (req, res, next) => {
            debug("GET: program");

            try {
                const programs: any[] = [];

                // make a list of program data to return
                programManager.listPrograms().forEach((p) => {
                    programs.push(p.toStorable());
                });

                res.json({
                    programs,
                });

            } catch (e) {
                res.status(500).send("could not process this request " + e);
            }
        });

        router.get("/program/:program_id", (req, res, next) => {
            debug("GET: program:program_id");

            res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
            res.header("Expires", "-1");
            res.header("Pragma", "no-cache");

            const programId: string = req.params.program_id;

            try {
                const program: IProgram = programManager.getProgram(programId);

                if (program) {
                    res.json({
                        program: program.toStorable(),
                    });
                } else {
                    res.status(404).send("program not found");
                }

            } catch (e) {
                res.status(500).send("could not process this request " + e);
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
