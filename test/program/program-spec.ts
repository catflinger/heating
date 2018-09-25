import { IControllerSettings, IProgram, INJECTABLES, ProgramSnapshot } from "../../src/controller/types";
import { Program } from "../../src/controller/program";
import { container } from "./inversify.config.test";
import * as fs from "fs";

import * as chai from "chai";
import "mocha";

const expect = chai.expect;

let program: IProgram;
let max: number;
let min: number;
let slotsPerDay = container.get<number>(INJECTABLES.SlotsPerDay);

const minHWTemp = 40;
const maxHWTemp = 50;

describe("program", () => {

    before(() => {

        const json: string = '{"id":"id123","name":"some name","maxHWTemp":50,"minHWTemp":40,"slots":[true,false,true,false,true,false,false,false,false,false]}';
        program = container.get<IProgram>(INJECTABLES.Program);
        program.loadFromSnapshot(JSON.parse(json));

        min = 0;
        max = slotsPerDay - 1;

    });

    it("should construct", () => {
        expect(program).not.to.be.undefined;
    });

    it("shoud have loaded from valid JSON", () => {

        expect(program.minHWTemp).to.equal(40, "wrong value for minHWTemp");
        expect(program.maxHWTemp).to.equal(50, "wrong value for maxHWTemp");
        expect(program.getValue(0)).to.equal(true, "wrong value for slot 0");
        expect(program.getValue(1)).to.equal(false, "wrong value for slot 1");
        expect(program.getValue(9)).to.equal(false, "wrong value for slot 9");
    });

    it("should return hot water thresholds", () => {
        expect(program.minHWTemp).to.equal(minHWTemp, "wrong value for min hw teperature");
        expect(program.maxHWTemp).to.equal(maxHWTemp, "wrong value for max hw teperature");
    });

    it("should return a heating slot value in range", () => {
        // lower bound for index
        expect(program.getValue(min)).to.equal(true, "wrong value for min slot number");
        // in-range index
        expect(program.getValue(min + 3)).to.equal(false, "wrong value for mid slot number");
        // upper bound for index
        expect(program.getValue(max)).to.equal(false, "wrong value for max slot number");
    });

    it("should refuse to return a heating slot value out of range", () => {
        expect(() => program.getValue(min - 1)).to.throw();
        expect(() => program.getValue(max + 1)).to.throw();
        expect(() => program.getValue(200000)).to.throw();
    });

    it("should set a range of values", () => {
        program.setRange([true, true, false, true, true], 1, 5);
        expect(program.getValue(0)).to.equal(true, "slot 0 set unexpctedly");
        expect(program.getValue(1)).to.equal(true, "slot 1 not set");
        expect(program.getValue(2)).to.equal(true, "slot 2 not set");
        expect(program.getValue(3)).to.equal(false, "slot 3 not set");
        expect(program.getValue(4)).to.equal(true, "slot 4 not set");
        expect(program.getValue(5)).to.equal(true, "slot 5 not set");
        expect(program.getValue(6)).to.equal(false, "slot 6 set unexpectedly");
    });

    it("should set a single value", () => {
        program.setRange([true], min, min);
        expect(program.getValue(min)).to.equal(true, "slot 0 set unexpctedly");

        program.setRange([true], min, min);
        expect(program.getValue(min)).to.equal(true, "slot 0 set unexpctedly");

        program.setRange([true], min, min);
        expect(program.getValue(min)).to.equal(true, "slot 0 set unexpctedly");
    });

    it("should refuse to set an invalid range", () => {
        // below start of valid valid
        expect(() => program.setRange([false], min - 1, min)).to.throw();
        // above start of valid values
        expect(() => program.setRange([false], max, max + 1)).to.throw();
        // too few values
        expect(() => program.setRange([false, false], 1, 3)).to.throw();
        // range specified backwards
        expect(() => program.setRange([false, false, true], 3, 1)).to.throw();
    });

    it("shoud serialise to JSON", () => {
        // set some program values
        program.setRange([true, false], 1, 2);

        //serialse the program
        const json: string = program.getSnapshot().toJson();

        expect(json).to.be.not.null;
        expect(json.length).to.be.greaterThan(0, "zero length string produced");

        // rehydrate the json to an object
        const obj: ProgramSnapshot = ProgramSnapshot.fromJson(json);

        // check the object contains the original program values
        expect(obj.id).to.equal("id123");
        expect(obj.name).to.equal("some name");
        expect(obj.minHWTemp).to.equal(minHWTemp);
        expect(obj.maxHWTemp).to.equal(maxHWTemp);
        expect(obj.slots.length).to.equal(slotsPerDay);
        expect(obj.slots[1]).to.equal(true, "wrong value for slot 1");
        expect(obj.slots[2]).to.equal(false, "wrong value for slot 2");
    });

    it("shoud refuse to load from invalid JSON", () => {
        // slot array missing
        let json: string = '{"maxHWTemp":55,"minHWTemp":45}';
        expect(() => program.loadFromSnapshot(ProgramSnapshot.fromJson(json))).to.throw();
        // slot array not an array
        json = '{"maxHWTemp":55,"minHWTemp":45,"slots": "foo"}';
        expect(() => program.loadFromSnapshot(ProgramSnapshot.fromJson(json))).to.throw();
        // array too short
        // json = '{"maxHWTemp":55,"minHWTemp":45,"slots":[true, false]}';
        // expect(() => program.loadFromSnapshot(ProgramSnapshot.fromJson(json))).to.throw();
        // array contains invalid fields
        json = '{"maxHWTemp":55,"minHWTemp":45,"slots":[1,0,true,false,true,false,false,false,false,false]}';
        expect(() => program.loadFromSnapshot(ProgramSnapshot.fromJson(json))).to.throw();

        // minHWTemp missing
        json = '{"maxHWTemp":45,"slots":[true,false,true,false,true,false,false,false,false,false]}';
        expect(() => program.loadFromSnapshot(ProgramSnapshot.fromJson(json))).to.throw();
        // minHWTemp not numeric
        json = '{"maxHWTemp":55,"minHWTemp":"45","slots":[true,false,true,false,true,false,false,false,false,false]}';
        expect(() => program.loadFromSnapshot(ProgramSnapshot.fromJson(json))).to.throw();
        // minHWTemp too low
        json = '{"maxHWTemp":55,"minHWTemp":0,"slots":[true,false,true,false,true,false,false,false,false,false]}';
        expect(() => program.loadFromSnapshot(ProgramSnapshot.fromJson(json))).to.throw();
        // minHWTemp too low
        json = '{"maxHWTemp":55,"minHWTemp":61,"slots":[true,false,true,false,true,false,false,false,false,false]}';
        expect(() => program.loadFromSnapshot(ProgramSnapshot.fromJson(json))).to.throw();

        // maxHWTemp missing
        json = '{"minHWTemp":45,"slots":[true,false,true,false,true,false,false,false,false,false]}';
        expect(() => program.loadFromSnapshot(ProgramSnapshot.fromJson(json))).to.throw();
        // maxHWTemp not numeric
        json = '{"maxHWTemp":"55","minHWTemp":45,"slots":[true,false,true,false,true,false,false,false,false,false]}';
        expect(() => program.loadFromSnapshot(ProgramSnapshot.fromJson(json))).to.throw();
        // maxHWTemp too low
        json = '{"maxHWTemp":0,"minHWTemp":45,"slots":[true,false,true,false,true,false,false,false,false,false]}';
        expect(() => program.loadFromSnapshot(ProgramSnapshot.fromJson(json))).to.throw();
        // minHWTemp too low
        json = '{"maxHWTemp":61,"minHWTemp":45,"slots":[true,false,true,false,true,false,false,false,false,false]}';
        expect(() => program.loadFromSnapshot(ProgramSnapshot.fromJson(json))).to.throw();

        // minHWTemp and max too close
        json = '{"maxHWTemp":45,"minHWTemp":45,"slots":[true,false,true,false,true,false,false,false,false,false]}';
        expect(() => program.loadFromSnapshot(ProgramSnapshot.fromJson(json))).to.throw();
        // minHWTemp and max too close
        json = '{"maxHWTemp":48,"minHWTemp":45,"slots":[true,false,true,false,true,false,false,false,false,false]}';
        expect(() => program.loadFromSnapshot(ProgramSnapshot.fromJson(json))).to.throw();
        // minHWTemp and max wrong order
        json = '{"maxHWTemp":45,"minHWTemp":55,"slots":[true,false,true,false,true,false,false,false,false,false]}';
        expect(() => program.loadFromSnapshot(ProgramSnapshot.fromJson(json))).to.throw();
    });
});