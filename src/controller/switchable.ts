import * as Debug from "debug";
import { readFileSync, writeFileSync } from "fs";
import { inject, injectable } from "inversify";

import { IControllerSettings, INJECTABLES, ISwitchable } from "./types";

const debug = Debug("app");

@injectable()
export class Switchable implements ISwitchable {
    private _name: string;
    private _pin: number;

    private _gpioPath: string;

    constructor(name: string, pin: number) {
        this._name = name;
        this._pin = pin;
        this._gpioPath = `/sys/class/gpio/gpio${this._pin}/value`;
    }

    public get name(): string {
        return this._name;
    }

    public get state(): boolean {
        let result: boolean = false;
        try {
            // the read will return chars 49 10 for high (device on) and 48 10 for low (device off)
            const val: string = readFileSync(this._gpioPath, "utf8");
            result = (val.charCodeAt(0) === 49);
        } catch (e) {
            debug("failed to read device state " + e.message);
        }
        return result;
   }

    public init(): void {
        // do we still need this in the interface?
     }

    public toggle(): void {
        const currentState: boolean = this.state;
        this.switch(!currentState);
    }

    public switch(state: boolean): void {
        const val: string = state ? "1" : "0";
        try {
            writeFileSync(this._gpioPath, val, "utf8");
        } catch (e) {
            debug("failed to write device state " + e.message);
        }
    }

}
