import { IControllerSettings } from "../controller/types";
export declare class ControllerSettings implements IControllerSettings {
    readonly startPolling: boolean;
    readonly programStoreDir: string;
    readonly debugDir: string;
    readonly boilerPath: string;
    readonly hwPumpPath: string;
    readonly chPumpPath: string;
    readonly slotsPerDay: number;
    readonly maxOverrideDuration: number;
}
