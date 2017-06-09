import { inject, injectable } from "inversify";

import { Validate } from "../common/validate";
import { ProgramSnapshot } from "./snapshots/program-snapshot";
import { IControllerSettings, INJECTABLES, IProgram } from "./types";

@injectable()
export class Program implements IProgram {

    // array to hold the heating program: true=heating ON, false = heating off
    private slots: boolean[] = [];

    // threshold value for hot water
    private _minHwTemp: number;
    private _maxHwTemp: number;

    constructor(@inject(INJECTABLES.ControllerSettings) private settings: IControllerSettings) {

        // set default values for hot water
        this._maxHwTemp = 50;
        this._minHwTemp = 40;

        // set defaults for heating
        for (let i = 0; i < this.settings.slotsPerDay; i++) {
            this.slots.push(false);
        }
    }

    public getValue(slot: number): boolean {
        Validate.isInteger(slot, "slot number not numeric");

        if (slot < 0 || slot >= this.settings.slotsPerDay) {
            throw new Error("Method not implemented.");
        }

        return this.slots[slot];
    }

    public getSnapshot(): ProgramSnapshot {
        return new ProgramSnapshot(this._minHwTemp, this._maxHwTemp, this.slots, this.settings.slotsPerDay);
    }

    // public getValue(slotNumber: number): boolean {
    //     this.validateSlotNumber(slotNumber);
    //     return this.slots[slotNumber];
    // }

    public get minHWTemp(): number {
        return this._minHwTemp;
    }

    public get maxHWTemp(): number {
        return this._maxHwTemp;
    }

    public setHWTemps(min: number, max: number) {
        if (min > 10 && max > 10 && min < 60 && max < 60 && max - min > 5) {
            this._minHwTemp = min;
            this._maxHwTemp = max;
        } else {
            throw new Error("HW temperature value out of range");
        }
    }

    public setRange(state: boolean[], from: number, to: number): void {

        this.validateSlotNumber(from, to);

        if (!state || from > to || state.length < to - from + 1) {
            throw new Error("invalid parameters for setRange");
        }

        for (let i = 0; i <= to - from; i++) {
            this.slots[from + i] = state[i];
        }
    }

    public toJson(): string {
        return JSON.stringify({
            hwmax: this._maxHwTemp,
            hwmin: this._minHwTemp,
            slots: this.slots,
        });
    }

    public loadJson(json: string): void {
        let valid: boolean = true;
        const src: any = JSON.parse(json);

        // validate the input string
        if (!src ||
            (typeof src.hwmax !== "number") ||
            (typeof src.hwmin !== "number") ||
            !Array.isArray(src.slots) ||
            src.slots.length !== this.settings.slotsPerDay) {

            // reject the data
            valid = false;

        } else {
            // test each slot is boolean
            for (const slot of src.slots)  {
                if (typeof slot !== "boolean") {
                    valid = false;
                    break;
                }
            }
        }

        if (valid) {
            this.setHWTemps(src.hwmin, src.hwmax);

            for (let i: number = 0; i < src.slots.length; i++)  {
                this.slots[i] = src.slots[i];
            }
        } else {
            throw new Error("Invalid or missing values in json.");
        }
    }

    private validateSlotNumber(...args: number[]) {
        args.forEach((arg: number) => {
            if (isNaN(arg) || arg < 0 || arg >= this.settings.slotsPerDay) {
                throw new Error("Slots per day out of range");
            }
        });
    }

}
