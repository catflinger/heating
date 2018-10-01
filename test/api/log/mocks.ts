import { injectable, inject } from "inversify";
import "reflect-metadata";
import * as path from "path";

import { 
    IEnvironment, 
    IController, 
    ControlStateSnapshot,
    SensorSnapshot,
    IControllerSettings,
    IProgramManager} from "../../../src/controller/types";

@injectable()
export class MockController implements IController {
    public programManager:IProgramManager;

    getSnapshot(): ControlStateSnapshot {
        return new ControlStateSnapshot(true, true);
    }

    start(): void {
        // throw new Error("Method not implemented.");
    }
    setOverride(duration: number): void {
        throw new Error("Method not implemented.");
    }
    clearOverride(): void {
        throw new Error("Method not implemented.");
    }
    refresh(): void {
        // throw new Error("Method not implemented.");
    }
}

@injectable()
export class MockEnvironment implements IEnvironment {
    
    getSnapshot(): SensorSnapshot[] {
        const snapshots: SensorSnapshot[] = [
            new SensorSnapshot("hw", "", 54.1),
            new SensorSnapshot("bedroom", "", 18),
            new SensorSnapshot("loft", "", 12),
            new SensorSnapshot("garage", "", 13),
        ];

        return snapshots;
    }    
    
    refresh(): void {
        throw new Error("Method not implemented.");
    }
}

@injectable()
export class MockControllerSettings implements IControllerSettings {

    logDir: string = path.join(__dirname, "..", "..", "data", "log");

    maxOverrideDuration: number;    boilerPath: string;
    debugDir: string;
    hwPumpPath: string;
    chPumpPath: string;
    programStoreDir: string;
    startPolling: boolean;
    startLogging: boolean;
}