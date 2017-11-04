import { EnvironmentSnapshot, IEnvironment, IEnvironmentSettings } from "./types";
export declare class Environment implements IEnvironment {
    private settings;
    private sensors;
    constructor(settings: IEnvironmentSettings);
    getSnapshot(): EnvironmentSnapshot;
    refresh(): void;
}
