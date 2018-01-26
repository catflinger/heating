import { IControllerSettings } from "../controller/types";
export declare class ControllerSettings implements IControllerSettings {
    readonly programStoreDir: string;
    readonly boilerPath: string;
    readonly hwPumpPath: string;
    readonly chPumpPath: string;
    readonly slotsPerDay: number;
    readonly maxOverrideDuration: number;
}
