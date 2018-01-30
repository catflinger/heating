import { IControllerSettings } from "../../src/controller/types";
export declare class MockControllerSettings implements IControllerSettings {
    startPolling: boolean;
    programStoreDir: string;
    boilerPath: string;
    chPumpPath: string;
    hwPumpPath: string;
    slotsPerDay: number;
    readonly maxOverrideDuration: number;
}
