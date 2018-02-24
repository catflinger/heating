import { IControllerSettings } from "../../src/controller/types";
export declare class MockControllerSettings implements IControllerSettings {
    startPolling: boolean;
    programStoreDir: string;
    debugDir: string;
    boilerPath: "";
    chPumpPath: "";
    hwPumpPath: "";
    readonly maxOverrideDuration: number;
}
