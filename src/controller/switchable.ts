import * as Debug from "debug";
import { readFileSync, writeFileSync } from "fs";
import { injectable } from "inversify";
import { IControllerSettings, ISwitchable } from "./types";

const debug = Debug("app");

@injectable()
export class Switchable implements ISwitchable {
    protected name: string;
    protected gpioPath: string;

    public getName(): string {
        return this.name;
    }

    public getState(): boolean {
        // the read will return chars 49 10 for high (device on) and 48 10 for low (device off)
        const val: string = readFileSync(this.gpioPath, "utf8");
        return (val.charCodeAt(0) === 49);
   }

    public switch(state: boolean): void {
        const val: string = state ? "1" : "0";
        writeFileSync(this.gpioPath, val, "utf8");
    }

}
