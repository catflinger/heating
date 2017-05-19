import { writeFileSync } from "fs";
import { inject, injectable } from "inversify";

import { IControllerSettings, IDigitalOutput, INJECTABLES, ISwitchable } from "./types";

@injectable()
export class Switchable implements ISwitchable {
    private _name: string;
    private _pin: number;

    @inject(INJECTABLES.DigitalOutput)
    private gpio: IDigitalOutput;

    constructor(name: string, pin: number) {
        this._name = name;
        this._pin = pin;
    }

    public get name(): string {
        return this._name;
    }

    public get state(): boolean {
        return this.gpio.read(this._pin);
   }

    public init(): void {
        return this.gpio.use(this._pin);
    }

    public toggle(): void {
        const currentState: boolean = this.gpio.read(this._pin);
        this.gpio.write(this._pin, !currentState);
    }
    public switch(state: boolean): void {
        this.gpio.write(this._pin, state);
    }

}
