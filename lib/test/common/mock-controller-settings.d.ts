import { IControllerSettings } from "../../src/controller/types";
export declare class MockControllerSettings implements IControllerSettings {
    programFile: string;
    boilerPin: number;
    hwPumpPin: number;
    chPumpPin: number;
    slotsPerDay: number;
    readonly maxOverrideDuration: number;
}
