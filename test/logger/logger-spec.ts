import { INJECTABLES, IControllerSettings } from "../../src/controller/types";
import { container } from "./inversify.config.test";
import { Logger } from "../../src/logger/logger";
import * as path from "path";
import { existsSync, unlinkSync, readFileSync } from "fs"; 

import * as chai from "chai";
import "mocha";
const expect = chai.expect;

const logger: Logger = container.get<Logger>(INJECTABLES.Logger);
const settings: IControllerSettings = container.get<IControllerSettings>(INJECTABLES.ControllerSettings);

// regular expressions to match log entries
const expOneLogHeader = "time,heating,water,A,B,C,D,E(\r|\n|\r\n)";
const expOneLogRecord = "\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2},1,1,54.1,18\.0,0,12\.0,13\.0(\r|\n|\r\n)";
const oneRecord: RegExp = new RegExp("^" + expOneLogHeader + expOneLogRecord + "$");
const twoRecord:RegExp = new RegExp("^" + expOneLogHeader + expOneLogRecord + expOneLogRecord + "$");

describe("logger", () => {

    it("should create a new log file", (done) => {
        if (existsSync(logger.getLogfileName())) {
            unlinkSync(logger.getLogfileName());
        }

        logger.writeLogEntry();
        
        setTimeout(() => {
            expect(existsSync(logger.getLogfileName())).to.be.true;
            const data: string = readFileSync(logger.getLogfileName(), "utf-8");
            expect(oneRecord.test(data)).to.be.true;
            done();
        }, 500);
    });

    it("should write to an existing log file", (done) => {

        logger.writeLogEntry();
        
        setTimeout(() => {
            expect(existsSync(logger.getLogfileName())).to.be.true;
            const data: string = readFileSync(logger.getLogfileName(), "utf-8");
            expect(twoRecord.test(data)).to.be.true;
            done();
        }, 500);
    });
});