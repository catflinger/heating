import * as Debug from "debug";
import { readFileSync, writeFileSync } from "fs";
import { injectable } from "inversify";
import { IControllerSettings, ISwitchable } from "./types";

const debug = Debug("app");

@injectable()
export class Switchable implements ISwitchable {
    // these members are public to workaround inversifyjs limitation for inheritance
    // see: https://github.com/inversify/InversifyJS/blob/master/wiki/inheritance.md
    public name: string;
    public gpioPath: string;

    public get state(): boolean {
        // the read will return chars 49 10 for high (device on) and 48 10 for low (device off)
        const val: string = readFileSync(this.gpioPath, "utf8");
        return (val.charCodeAt(0) === 49);
   }

    public toggle(): void {
        const currentState: boolean = this.state;
        this.switch(!currentState);
    }

    public switch(state: boolean): void {
        const val: string = state ? "1" : "0";
        writeFileSync(this.gpioPath, val, "utf8");
    }

}
