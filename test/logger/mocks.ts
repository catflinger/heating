import { injectable, inject } from "inversify";
import "reflect-metadata";
import * as path from "path";

import { 
    IEnvironment, 
    IController, 
    ControlStateSnapshot,
    SensorSnapshot,
    IControllerSettings,
    IProgramManager,
    INJECTABLES,
    IOneWireListCallback} from "../../src/controller/types";

@injectable()
export class MockController implements IController {
    public programManager:IProgramManager;

    getSnapshot(): ControlStateSnapshot {
        return new ControlStateSnapshot(true, true);
    }

    start(): void {
        throw new Error("Method not implemented.");
    }
    setOverride(duration: number): void {
        throw new Error("Method not implemented.");
    }
    clearOverride(): void {
        throw new Error("Method not implemented.");
    }
    refresh(): void {
        throw new Error("Method not implemented.");
    }
}

@injectable()
export class MockEnvironment implements IEnvironment {
    reloadSensors(): void {
        throw new Error("Method not implemented.");
    }
    getSensor(id: string): SensorSnapshot {
        throw new Error("Method not implemented.");
    }
    
    getSnapshot(): SensorSnapshot[] {
        const snapshots: SensorSnapshot[] = [
            new SensorSnapshot("hw", "", 54.1, "hw"),
            new SensorSnapshot("bedroom", "", 18, null),
            new SensorSnapshot("loft", "", 12, null),
            new SensorSnapshot("garage", "", 13, null),
        ];

        return snapshots;
    }    
    
    refresh(): void {
        throw new Error("Method not implemented.");
    }

    findOneWireDevices(callback: IOneWireListCallback): void {
        throw new Error("Method not implemented.");
    }
}

@injectable()
export class MockControllerSettings implements IControllerSettings {
    constructor(
        @inject(INJECTABLES.AppRootDir) private appRootDir: string,
    ) {}

    logDir: string = path.join(this.appRootDir, "log");

    maxOverrideDuration: number;    boilerPath: string;
    debugDir: string;
    hwPumpPath: string;
    chPumpPath: string;
    programStoreDir: string;
    startPolling: boolean;
    startLogging: boolean;
}