import { injectable, inject } from "inversify";
import "reflect-metadata";

import { 
    IEnvironment, 
    IControlStrategy,
    IOneWireListCallback, 
    IProgram, 
    ISwitchable, 
    ISensor,
    ControlStateSnapshot,
    OverrideSnapshot,
    ProgramSnapshot ,
    SensorSnapshot,
} from "../../src/controller/types";

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
    id: string = "28.1234abdc060000";
    description: string = "hot water";
    role: "hw";
    read(): void {
        throw new Error("Method not implemented.");
    }
}

@injectable()
export class MockEnvironment implements IEnvironment {

    public findOneWireDevices(callback: IOneWireListCallback): void {
        throw new Error("Method not implemented.");
    }
    private hwSensor: MockSensor = new MockSensor();

    refresh(): void {
        // do nothing
    }
    
    public getSnapshot(): SensorSnapshot[] {
        const snaps: SensorSnapshot[] = [];
        snaps.push(new SensorSnapshot(this.hwSensor.id, this.hwSensor.description, this.hwSensor.reading, this.hwSensor.role));
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
export class MockBoiler implements ISwitchable {
    private name: string;
    private state: boolean;

    public getName(): string {
        return this.name;
    }

    public getState(): boolean {
        return this.state;
    }

    public switch(state: boolean): void {
        this.state = state;
    }
    constructor() {
        this.name = "Boiler";
        this.state = false;
    }
}

@injectable()
export class MockCHPump implements ISwitchable {
    private name: string;
    private state: boolean;

    public getName(): string {
        return this.name;
    }

    public getState(): boolean {
        return this.state;
    }

    switch(state: boolean): void {
        this.state = state;
    }
    constructor() {
        this.name = "CHPump";
        this.state = false;
    }
}

@injectable()
export class MockHWPump implements ISwitchable {
    private name: string;
    private state: boolean;

    public getName(): string {
        return this.name;
    }

    public getState(): boolean {
        return this.state;
    }

    switch(state: boolean): void {
        this.state = state;
    }
    constructor() {
        this.name = "HWPump";
        this.state = false;
    }
}

