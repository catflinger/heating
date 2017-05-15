import { IProgram, INJECTABLES } from "../../src/controller/types";
import { Program } from "../../src/controller/program";
import { container } from "./inversify.config.test";

import * as chai from "chai";
import "mocha";

const expect = chai.expect;

let program: IProgram;

describe("program", () => {

    before(() => {
        program = container.get<IProgram>(INJECTABLES.Program);
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
        expect(program.getValue(0)).to.equal(false, "wrong value for slot number");
        // in-range index
        expect(program.getValue(3)).to.equal(false, "wrong value for slot number"); // mid value
        // upper bound for index
        expect(program.getValue(program.slotsPerDay - 1)).to.equal(false, "wrong value for slot number");
    });

    it("should refuse to return a heating slot value out of range", () => {
        expect(() => program.getValue(-1)).to.throw();
        expect(() => program.getValue(program.slotsPerDay)).to.throw();
        expect(() => program.getValue(200000)).to.throw();
    });

    it("should set a range of values", () => {
        program.setRange(true, 1, 10);
        expect(program.getValue(0)).to.equal(false, "slot 0 set unexpctedly");
        expect(program.getValue(1)).to.equal(true, "slot 1 not set");
        expect(program.getValue(5)).to.equal(true, "slot 5 not set");
        expect(program.getValue(10)).to.equal(true, "slot 10 not set");
        expect(program.getValue(11)).to.equal(false, "slot 11 set unexpectedly");
    });

    it("should refuse to set an invalid range", () => {
        expect(() => program.setRange(false, -1, 6)).to.throw();
        expect(() => program.setRange(false, 6, program.slotsPerDay)).to.throw();
    });
});