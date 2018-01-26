
import { IControllerSettings, IProgram, IProgramManager, INJECTABLES } from "../../src/controller/types";
import { Program } from "../../src/controller/program";
import { ProgramManager } from "../../src/controller/program-manager";
import { container } from "./inversify.config.test";
import * as fs from "fs";

import * as chai from "chai";
import "mocha";

const expect = chai.expect;

let settings: IControllerSettings;
let programManager: IProgramManager;
let slotsPerDay = container.get<number>(INJECTABLES.SlotsPerDay);

const minHWTemp = 40;
const maxHWTemp = 50;

describe("program-manager", () => {

    before(() => {
        settings = container.get<IControllerSettings>(INJECTABLES.ControllerSettings);

        programManager = container.get<IProgramManager>(INJECTABLES.ProgramManager);

    });

    it("should construct", () => {
        expect(programManager).not.to.be.undefined;
    });

    it("should load default program", () => {
        expect(programManager.activeProgram).not.to.be.undefined;
        expect(programManager.activeProgram.maxHWTemp).equals(maxHWTemp);
    });

    // TODO: write some more test about loading and saving programs

    // it("should save", () => {
    //     const file: string = settings.programStoreDir;

    //     if (fs.existsSync(file)) {
    //         fs.unlinkSync(file);
    //     }
    //     expect(fs.existsSync(file)).to.be.false;

    //     program.toStorable();
    //     expect(fs.existsSync(file)).to.be.true;
    // });
});