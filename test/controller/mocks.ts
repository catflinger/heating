import { injectable, inject } from "inversify";
import "reflect-metadata";

import { 
    IEnvironment, 
    IControlStrategy, 
    IProgram, 
    ISwitchable, 
    ISensor,
    ControlStateSnapshot,
    OverrideSnapshot,
    ProgramSnapshot ,
    SensorSnapshot} from "../../src/controller/types";

@injectable()
export class MockControlStrategy implements IControlStrategy {
    public water: boolean = false; //mock result, to be set by tests
    public heating: boolean = false; //mock result, to be set by tests

    // returns whatever the test has set in the water and heating members
    calculateControlState(       
        env: SensorSnapshot[],
        program: ProgramSnapshot,
        current: ControlStateSnapshot,
        overrides: OverrideSnapshot[]): ControlStateSnapshot {
        return new ControlStateSnapshot(this.heating, this.water);
    }  
}

class MockSensor implements ISensor {
    reading: number = 45;
    id: string = "hw";
    description: string = "hot water";
    read(): void {
        throw new Error("Method not implemented.");
    }
}

@injectable()
export class MockEnvironment implements IEnvironment {
    private hwSensor: MockSensor = new MockSensor();

    refresh(): void {
        // do nothing
    }
    
    public getSnapshot(): SensorSnapshot[] {
        const snaps: SensorSnapshot[] = [];
        snaps.push(new SensorSnapshot(this.hwSensor.id, this.hwSensor.description, this.hwSensor.reading));
        return snaps;
    }

    public setHWTemperature(temp: number) {
        this.hwSensor.reading = temp;
    }
}

@injectable()
export class MockProgram implements IProgram {
    id: string = "abc";
    name: string = "mock program";
    save(): void {
        throw new Error("Method not implemented.");
    }
    getValue(slot: number): boolean {
        throw new Error("Method not implemented.");
    }
    getSnapshot(): ProgramSnapshot {
        throw new Error("Method not implemented.");
    }
    setHWTemps(min: number, max: number): void {
        throw new Error("Method not implemented.");
    }
    toStorable(): any {
        throw new Error("Method not implemented.");
    }
    toJson(): string {
        throw new Error("Method not implemented.");
    }
    loadDefaults(): void {
        throw new Error("Method not implemented.");
    }
    loadFromSnapshot(src: ProgramSnapshot): void {
        throw new Error("Method not implemented.");
    }
    loadFromJson(json: string): void {
        throw new Error("Method not implemented.");
    }

    setRange(state: boolean[], from: number, to: number): void {
        throw new Error("Method not implemented.");
    }

    //constant for number of programmable time slots in the day
    public get slotsPerDay(): number {
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

    public init(): void {
    }

    public get name(): string {
        return this._name;
    }
    
    public set name(str: string) {
        this._name = str;
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