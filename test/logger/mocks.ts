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
    IOneWireListCallback,
    IEnvironmentSettings,
    SensorSetting} from "../../src/controller/types";

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
export class MockEnvironmentSettings implements IEnvironmentSettings {

    getSensorSettings(): SensorSetting[] {
        return [
            new SensorSetting("28.0", "A","B", 0, false),
            new SensorSetting("28.1", "B","B", 1, false),
            new SensorSetting("28.x", "C","B", 2, true), // this should still be logged
            new SensorSetting("28.2", "D","B", 3, false),
            new SensorSetting("28.3", "E","B", 4, false),
        ];
    }    
    
    getSensorSetting(id: string): SensorSetting {
        throw new Error("Method not implemented.");
    }
    
    updateSensorSetting(sensor: SensorSetting): void {
        throw new Error("Method not implemented.");
    }
    
    removeSensorSetting(id: string): void {
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
            new SensorSnapshot("28.0", "", 54.1, "hw"),
            new SensorSnapshot("28.1", "", 18, null),
            new SensorSnapshot("28.2", "", 12, null),
            new SensorSnapshot("28.3", "", 13, null),
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