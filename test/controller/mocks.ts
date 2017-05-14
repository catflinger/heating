import { injectable, inject } from "inversify";
import "reflect-metadata";

import { EnvironmentSnapshot, IEnvironment, IControllerSettings, IProgram, ISwitchable, Sensors } from "../../src/controller/types";

@injectable()
export class MockEnvironment implements IEnvironment {
    public getSnapshot(): EnvironmentSnapshot {
        const result: EnvironmentSnapshot = new EnvironmentSnapshot();
        result.hwTemperature = 31;
        return result;
    }

}

@injectable()
export class MockControllerSettings implements IControllerSettings {
    placeholder() {
        throw new Error("Method not implemented.");
    }

}

@injectable()
export class MockProgram implements IProgram {
    minHWTemp: number = 40;
    maxHWTemp: number = 50;
}

@injectable()
export class MockDevice implements ISwitchable {
    private _name: string = "un-named device";
    private _state: boolean = false;

    public get name(): string {
        return this._name;
    }
    
    public get state(): boolean {
        return this._state;
    }

    toggle(): void {
        this._state = !this.state;
    }

    switch(state: boolean): void {
        this._state = state;
    }

}