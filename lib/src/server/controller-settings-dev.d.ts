import { IControllerSettings } from "../../src/controller/types";
export declare class ControllerSettingsDev implements IControllerSettings {
    startPolling: boolean;
    programStoreDir: string;
    debugDir: string;
    boilerPath: string;
    chPumpPath: string;
    hwPumpPath: string;
    readonly maxOverrideDuration: number;
}
