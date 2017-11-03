import { EnvironmentSnapshot, IEnvironment } from "./types";
export declare class Environment implements IEnvironment {
    private settings;
    getSnapshot(): EnvironmentSnapshot;
    private readSensor(deviceId);
}
