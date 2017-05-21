import {
    ControlStateSnapshot,
    DeviceStateSnapshot,
    EnvironmentSnapshot,
    IClock,
    IControllerSettings,
    IControlStrategy,
    INJECTABLES,
    IProgram,
    Snapshot,
} from "../../src/types";

import { container } from "./inversify.config.test";
import { BasicControlStrategy } from "../../src/basic-control-strategy";
import { MockClock } from "./mocks";

import * as chai from "chai";
import "mocha";
const expect = chai.expect;

let bcs: IControlStrategy = container.get<IControlStrategy>(INJECTABLES.ControlStrategy);
let program: IProgram = container.get<IProgram>(INJECTABLES.Program);
let clock: MockClock = container.get<MockClock>(INJECTABLES.Clock);

describe("BasicControlStrategy", () => {

    describe("when controlling hot water", () => {
        before(() => {
            const json: string = '{"hwmax":50,"hwmin":40,"slots":[true,false,true,false,true,false,false,false,false,false]}';
            program.loadJson(json);
            clock.slotNumber = 0;
        });

        it("should heat the water when at startup defaults", () => {
            let result: ControlStateSnapshot = bcs.calculateControlState(program, testData_Default)
            // temp is too low so boiler should be on
            expect(result.hotWater).to.be.true;
            expect(result.heating).to.be.true;
        });
        
        it("should heat the water when cool", () => {
            let result: ControlStateSnapshot = bcs.calculateControlState(program, testData_Cool)
            // temp is too low so boiler should be on
            expect(result.hotWater).to.be.true;
            expect(result.heating).to.be.true;
        });

        it("should heat the water when already warm", () => {
            let result: ControlStateSnapshot = bcs.calculateControlState(program, testData_BeingHeated)
            // temp is still below upper threshold so boiler should be on
            expect(result.hotWater).to.be.true;
            expect(result.heating).to.be.true;
        });
        
        it("should not heat the water when already hot", () => {
            let result: ControlStateSnapshot = bcs.calculateControlState(program, testData_FullyHeated)
            // temp is high so boiler should be off
            expect(result.hotWater).to.be.false;
            expect(result.heating).to.be.true;
        });
        
        it("should not heat the water when warm but cooling fom hot", () => {
            let result: ControlStateSnapshot = bcs.calculateControlState(program, testData_Cooling)
            // temp is between thresholds on the way down so boiler should be off
            expect(result.hotWater).to.be.false;
            expect(result.heating).to.be.true;
        });
        
        it("should heat the water when cool again", () => {
            let result: ControlStateSnapshot = bcs.calculateControlState(program, testData_Cool)
            // temp is low again so boiler should be back on
            expect(result.hotWater).to.be.true;
            expect(result.heating).to.be.true;
        });
    });

    describe("when controlling heating", () => {
        before(() => {
            const json: string = '{"hwmax":50,"hwmin":40,"slots":[true,false,true,false,true,false,false,false,false,false]}';
            program.loadJson(json);
            clock.slotNumber = 0;
        });

        it("should turn heating on (clock at lower bound)", () => {
            clock.slotNumber = 0;   
            let result: ControlStateSnapshot = bcs.calculateControlState(program, testData_Cool)
            // temp is low again so boiler should be on
            expect(result.hotWater).to.be.true;
            expect(result.heating).to.be.true;
        });        

        it("should turn heating off", () => {
            clock.slotNumber = 1;
            let result: ControlStateSnapshot = bcs.calculateControlState(program, testData_Cool)
            // temp is low again so boiler should be on
            expect(result.hotWater).to.be.true;
            expect(result.heating).to.be.false;
        });        

        it("should turn heating off (clock at higher bound)", () => {
            clock.slotNumber = 9;
            let result: ControlStateSnapshot = bcs.calculateControlState(program, testData_Cool)
            // temp is low again so boiler should be on
            expect(result.hotWater).to.be.true;
            expect(result.heating).to.be.false;
        });        
    });

});


/**********************  TEST DATA ************************** */


const hwTempBelowThreshold = 30;
const hwTempInsideThreshold = 45;
const hwTempAboveThreshold = 55;

// everything at or returned to starting values
// note: this state should only exist temporarily at start-up
const testData_Default: any = {
    control: { heating: false, hotWater: false },
    device: { boiler: false, hwPump: false, chPump: false },
    environment: { hwTemperature: hwTempBelowThreshold }
}

// hot water cool
const testData_Cool: any = {
    control: { heating: false, hotWater: true },
    device: { boiler: true, hwPump: true, chPump: false },
    environment: { hwTemperature: hwTempBelowThreshold }
}

// hot water being heated
const testData_BeingHeated: any = {
    control: { heating: false, hotWater: true },
    device: { boiler: true, hwPump: true, chPump: false },
    environment: { hwTemperature: hwTempInsideThreshold }
}

// hot water fully heated
const testData_FullyHeated: any = {
    control: { heating: false, hotWater: false },
    device: { boiler: false, hwPump: false, chPump: false },
    environment: { hwTemperature: hwTempAboveThreshold }
}

// hot water cooling
const testData_Cooling: any = {
    control: { heating: false, hotWater: false },
    device: { boiler: false, hwPump: false, chPump: false },
    environment: { hwTemperature: hwTempInsideThreshold }
}
