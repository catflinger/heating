import { injectable } from "inversify";
import {IControllerSettings, IDigitalOutput, INJECTABLES } from "../../src/controller/types";

@injectable()
export class MockControllerSettings implements IControllerSettings {
    boilerPin: number = 21;
    hwPumpPin: number = 22;
    chPumpPin: number = 23;

    public slotsPerDay: number = 10;
        
    public get maxOverrideDuration(): number {
        return 10;    
    }
}

@injectable()
export class MockDigitalOutput implements IDigitalOutput {
    private pins: boolean[] = [];

    constructor() {
        this.pins.push(undefined);
        this.pins.push(undefined);
        this.pins.push(undefined);
    }    

    use(pin: number): void {
        this.pins[this.getPinIndex(pin)] = false;
    }

    read(pin: number): boolean {    
        let val: any = this.pins[this.getPinIndex(pin)];

        if (typeof val === "undefined") {
            throw new Error("Attempt to use uninitialised pin");
        }
        return val; 
    }

    write(pin: number, state: boolean): void {
        let val: any = this.pins[this.getPinIndex(pin)];

        if (typeof val === "undefined") {
            throw new Error("Attempt to use uninitialised pin");
        }
        this.pins[this.getPinIndex(pin)] = state;
    }

    private getPinIndex(pin: number) {
        switch (pin){
            case 21:
            return 0;

            case 22:
            return 1;

            case 23:
            return 2;

            default:
            throw new Error("MockDigitalOutput:read - invalid pin number");
        }
    }
}