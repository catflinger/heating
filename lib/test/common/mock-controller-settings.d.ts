import { IControllerSettings } from "../../src/controller/types";
export declare class MockControllerSettings implements IControllerSettings {
    programStore: string;
    boilerPin: number;
    hwPumpPin: number;
    chPumpPin: number;
    slotsPerDay: number;
    readonly maxOverrideDuration: number;
}
