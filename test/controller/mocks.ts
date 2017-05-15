import { injectable, inject } from "inversify";
import "reflect-metadata";

import { EnvironmentSnapshot, IEnvironment, IControllerSettings, IProgram, ISwitchable, Sensors } from "../../src/controller/types";

@injectable()
export class MockEnvironment implements IEnvironment {
    private hwTemp: number = 30;

    public getSnapshot(): EnvironmentSnapshot {
        const result: EnvironmentSnapshot = new EnvironmentSnapshot();
        result.hwTemperature = this.hwTemp;

        return result;
    }

    public setHWTemperature(temp: number) {
        this.hwTemp = temp;
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

    setRange(state: boolean, from: number, to: number): void {
        throw new Error("Method not implemented.");
    }

    //constant for number of programmable time slots in the day
    public get slotsPerDay(): number {
        throw new Error("Method not implemented.");
    }

    public getValue(slot: number): boolean {
        throw new Error("Method not implemented.");
    }

    public get minHWTemp(): number{
        return 40;
    }

    public get maxHWTemp(): number{
        return 50;
    }
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