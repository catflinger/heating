import { IProgram, INJECTABLES } from "../../src/controller/types";
import { Program } from "../../src/controller/program";
import { container } from "./inversify.config.test";

import * as chai from "chai";
import "mocha";

const expect = chai.expect;

let program: IProgram;
let max: number;
let min: number;

describe("program", () => {

    before(() => {
        program = container.get<IProgram>(INJECTABLES.Program);
        min = 0;
        max = program.slotsPerDay - 1;
    });

    it("should construct", () => {
        expect(program).to.be.not.null;
    });

    it("should return slots per day", () => {
        expect(program.slotsPerDay).to.equal(12 * 24, "wrong number of slots per day");
    });

    it("should return hot water thresholds", () => {
        expect(program.minHWTemp).to.equal(40, "wrong value for min hw teperature");
        expect(program.maxHWTemp).to.equal(50, "wrong value for max hw teperature");
    });

    it("should return a heating slot value in range", () => {
        // lower bound for index
        expect(program.getValue(min)).to.equal(false, "wrong value for min slot number");
        // in-range index
        expect(program.getValue(min + 3)).to.equal(false, "wrong value for mid slot number");
        // upper bound for index
        expect(program.getValue(max)).to.equal(false, "wrong value for max slot number");
    });

    it("should refuse to return a heating slot value out of range", () => {
        expect(() => program.getValue(min-1)).to.throw();
        expect(() => program.getValue(max + 1)).to.throw();
        expect(() => program.getValue(200000)).to.throw();
    });

    it("should set a range of values", () => {
        program.setRange([true, true, false, true, true], 1, 5);
        expect(program.getValue(0)).to.equal(false, "slot 0 set unexpctedly");
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
});