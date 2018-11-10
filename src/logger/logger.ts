import * as fs from "fs";
import { inject, injectable } from "inversify";
import { List } from "linqts";
import * as moment from "moment";
import { Job, scheduleJob } from "node-schedule";
import * as path from "path";

import { ILogLogstCallback, LogInfo } from "./log-info";

import {
    ControlStateSnapshot,
    IController,
    IControllerSettings,
    IEnvironment,
    IEnvironmentSettings,
    ILogger,
    INJECTABLES,
    ISensor,
    SensorSetting,
    SensorSnapshot,
} from "../controller/types";

type Callback = (err: boolean) => void;

@injectable()
export class Logger implements ILogger {

    private loggingJob: Job;
    private housekeepingJob: Job;
    private logFileName: string;

    constructor(
        @inject(INJECTABLES.Controller) private controller: IController,
        @inject(INJECTABLES.ControllerSettings) private settings: IControllerSettings,
        @inject(INJECTABLES.Environment) private environment: IEnvironment,
        @inject(INJECTABLES.EnvironmentSettings) private environmentSettings: IEnvironmentSettings) {

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
        const data: string = this.makeLogEntry();

        fs.exists(this.getLogfileName(), (exists) => {
            if (exists) {
                if (data) {
                    this.writeToLog(data, null);
                }
            } else {
                const headings: string = this.makeHeadings();
                if (headings && data) {
                    this.writeToLog(headings + data, null);
                }
            }
        });
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

    private makeLogEntry(): string {
        let result: string = null;

        try {
            const control: ControlStateSnapshot = this.controller.getSnapshot();
            const sensors: SensorSnapshot[] = this.environment.getSnapshot();
            const sensorSettings: SensorSetting[] = this.environmentSettings.getSensorSettings(true);

            const data: string[] = [];

            data.push(moment().format("YYYY-MM-DD HH:mm:ss"));
            data.push(control.heating ? "1" : "0");
            data.push(control.hotWater ? "1" : "0");

            // find the number of sensor columns to display
            const maxSensorPosition = new List<SensorSetting>(sensorSettings).Max((s) => s.position);

            // write the number of columns required, adding a value if we have one
            for (let i: number = 0; i <= maxSensorPosition && i < 30; i++) {
                let reading: string = "0";
                const sensorSetting: SensorSetting = sensorSettings.find((s) => s.position === i);

                if (sensorSetting) {
                    const sensor: SensorSnapshot = sensors.find((s) => s.id === sensorSetting.id);
                    if (sensor) {
                        reading = sensor.reading.toFixed(1);
                    }
                }
                data.push(reading);
            }

            result = data.join(",") + "\n";
        } catch {
            // TO DO: where to report this?
        }

        return result;
    }

    private makeHeadings(): string {
        let result: string = null;

        try {
            const sensorSettings: List<SensorSetting> = new List<SensorSetting>(this.environmentSettings.getSensorSettings(true));
            const data: string[] = [];

            data.push("time");
            data.push("heating");
            data.push("water");

            sensorSettings.OrderBy((s) => s.position).ForEach((s) => {
                data.push(s.description);
            });

            result = data.join(",") + "\n";

        } catch {
            // TO DO: where to report this?
        }
        return result;
    }

    private writeToLog(data: string, callback: Callback) {
        fs.appendFile(
            this.getLogfileName(),
            data,
            "utf-8",
            (err) => {
                if (callback) {
                    callback(err as any);
                }
            });

    }
}
