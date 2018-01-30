
import { IControllerSettings, IProgram, IProgramManager, INJECTABLES } from "../../src/controller/types";
import { Program } from "../../src/controller/program";
import { ProgramManager } from "../../src/controller/program-manager";
import { container } from "./inversify.config.test";
import * as fs from "fs";
import * as Path from "path";

import * as chai from "chai";
import "mocha";

const expect = chai.expect;

let settings: IControllerSettings = container.get<IControllerSettings>(INJECTABLES.ControllerSettings);

let slotsPerDay = container.get<number>(INJECTABLES.SlotsPerDay);

const minHWTemp = 40;
const maxHWTemp = 50;

function getProgramPath(id: string): string {
    return Path.join(settings.programStoreDir, "programs", id + ".json");
}

let latestFilePath: string = Path.join(settings.programStoreDir, "latest-program.json");
let programsDir: string = Path.join(settings.programStoreDir, "programs");

let lastProgramId: string = null;
let programManager: IProgramManager;

function removeProgramFile(id: string) {
    let path: string = getProgramPath(id);
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}

describe("program-manager", () => {

    describe("bootstrap", () => {

        before(() => {
            // delete any saved program info
            fs.unlinkSync(latestFilePath);

            // delete any program files
            let files: string[] = fs.readdirSync(programsDir);
            files.forEach((f) => {
                fs.unlinkSync(Path.join(programsDir, f));
            });
        });

        it("should bootstrap with no history", () => {
            // create the program manager
            programManager = container.get<IProgramManager>(INJECTABLES.ProgramManager);

            // expect the default program to be loaded and active
            expect(programManager).not.to.be.undefined;
            expect(programManager.activeProgram).not.to.be.undefined;
            expect(programManager.activeProgram.maxHWTemp).equals(maxHWTemp);

            lastProgramId = programManager.activeProgram.id;

            // expect the new program so be saved
            expect(fs.existsSync(getProgramPath(lastProgramId))).to.be.true;
        });
    });

    describe("load existing", () => {

        before(() => {
        });

        it("should load last used program", () => {
            // create the program manager
            programManager = container.get<IProgramManager>(INJECTABLES.ProgramManager);

            // expect the default program to be loaded and active
            expect(programManager).not.to.be.undefined;
            expect(programManager.activeProgram).not.to.be.undefined;
            expect(programManager.activeProgram.maxHWTemp).equals(maxHWTemp);

            // expect it to have the same id as last time
            expect(programManager.activeProgram.id).to.equal(lastProgramId);
        });

        it("should create a new program", () => {
            const data = {"name": "some name or other", "hwmax":50,"hwmin":40,"slots":[true,false,true,false,true,false,false,false,false,false]};
            let newProg: IProgram = programManager.createProgram(data);
            expect(typeof newProg.id).to.equal("string");
            expect(newProg.id.length).to.equal(36);

            // expect the new program so be saved
            expect(fs.existsSync(getProgramPath(newProg.id))).to.be.true;
        });

        it("should create a new program when data contains an empty id", () => {
            const data = {"id": "", "name": "some name or other", "hwmax":50,"hwmin":40,"slots":[true,false,true,false,true,false,false,false,false,false]};
            let newProg: IProgram  = programManager.createProgram(data);
            expect(typeof newProg.id).to.equal("string");
            expect(newProg.id.length).to.equal(36);
        });

        it("should fail to create a new program when data contains a given id", () => {
            const data = {"id": "12345", "name": "some name or other", "hwmax":50,"hwmin":40,"slots":[true,false,true,false,true,false,false,false,false,false]};
            expect(() => { programManager.createProgram(data) }).to.throw;
        });
    });

    describe("general", () => {

        before(() => {
        });

        it("should list programs", () => {
            // create the program manager
            programManager = container.get<IProgramManager>(INJECTABLES.ProgramManager);

            let programs: IProgram[] = programManager.listPrograms();
            
            // the tests above should have created 3 programs in total
            expect(programs.length).to.equal(3);
            let id0: string = programs[0].id;
            let id1: string = programs[1].id;
            let id2: string = programs[2].id;

            expect(id0.length).to.equal(36);
            expect(id1.length).to.equal(36);
            expect(id2.length).to.equal(36);
            expect(id0 === id1).to.be.false;
            expect(id1 === id2).to.be.false;
            expect(id0 === id2).to.be.false;
        });
    });

});