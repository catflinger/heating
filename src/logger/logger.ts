import * as fs from "fs";
import { inject, injectable } from "inversify";
import * as moment from "moment";
import { Job, scheduleJob } from "node-schedule";
import * as path from "path";

import { ILogLogstCallback, LogInfo } from "./log-info";

import {
    ControlStateSnapshot,
    IController,
    IControllerSettings,
    IEnvironment,
    ILogger,
    INJECTABLES,
    SensorSnapshot } from "../controller/types";

@injectable()
export class Logger implements ILogger {

    private loggingJob: Job;
    private housekeepingJob: Job;
    private logFileName: string;

    constructor(
        @inject(INJECTABLES.Controller) private controller: IController,
        @inject(INJECTABLES.ControllerSettings) private settings: IControllerSettings,
        @inject(INJECTABLES.Environment) private envController: IEnvironment) {

        this.logFileName = path.join(this.settings.logDir, "heatinglog-current.csv");
    }

    public start(): void {
        // schedule log every 5 minutes
        this.loggingJob = scheduleJob("00,05,10,15,20,25,30,35,40,45,50,55 * * * *", () => {
            this.writeLogEntry();
        });

        // schedule housekeep at just after midnight every day
        this.housekeepingJob = scheduleJob("02 00 * * *", () => {
            this.housekeep();
        });
    }

    public stop(): void {
        if (this.loggingJob) {
            this.loggingJob.cancel();
            this.loggingJob = null;

        }
        if (this.housekeepingJob) {
            this.housekeepingJob.cancel();
            this.housekeepingJob = null;
        }
    }

    public getLogfileName(): string {
        return this.logFileName;
    }

    public getLogList(callback: ILogLogstCallback): void {
        const results: LogInfo[] = [];

        try {
            fs.readdir(this.settings.logDir, { withFileTypes: true }, (err, files) => {
                if (err) {
                    callback(err, []);
                } else {
                    files.forEach((file: fs.Dirent) => {
                        if (file.isFile()) {
                            results.push(new LogInfo(file.name, new Date(), 0));
                        }
                    });
                    callback(null, results);
                    return;
                }
            });
        } catch (err) {
            callback(err, []);
        }
    }

    public writeLogEntry(): void {

        try {
            const control: ControlStateSnapshot = this.controller.getSnapshot();
            const env: SensorSnapshot[] = this.envController.getSnapshot();

            const data: string[] = [];

            data.push(moment().format("YYYY-MM-DD HH:mm:ss"));
            data.push(control.heating ? "1" : "0");
            data.push(control.hotWater ? "1" : "0");
            data.push(env.find((s) => s.id === "hw").reading.toFixed(1));
            data.push(env.find((s) => s.id === "bedroom").reading.toFixed(1));
            data.push(env.find((s) => s.id === "loft").reading.toFixed(1));
            data.push(env.find((s) => s.id === "garage").reading.toFixed(1));

            const entry: string = data.join(",") + "\n";

            fs.appendFile(
                this.getLogfileName(),
                entry,
                "utf-8",
                (err) => {
                    if (err) {
                        // should this be reported somewhere?
                    }
                });
        } catch {
            // TO DO: where to report this?
        }
    }

    public housekeep(): void {

        // TO DO: remove very old log files
        try {
            const currentName: string = this.getLogfileName();
            const newName: string = path.join(this.settings.logDir, moment().format("YYYYMMDD-hhmmss") + ".csv");

            fs.access(currentName, fs.constants.F_OK, (err1) => {
                if (!err1) {
                    fs.rename(currentName, newName, (err2) => {
                        if (err2) {
                            // TO DO: where to report this?
                        }
                    });
                } else {
                    // TO DO: where to report this?
                }
            });
        } catch {
            // TO DO: where to report this?
        }
    }
}
