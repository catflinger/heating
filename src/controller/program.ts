import * as fs from "fs";
import { inject, injectable } from "inversify";

import { Validate } from "../common/validate";
import { ProgramSnapshot } from "./snapshots/program-snapshot";
import { IControllerSettings, INJECTABLES, IProgram } from "./types";

@injectable()
export class Program implements IProgram {
    // general attributes
    private _id: string;
    private _name: string;

    // array to hold the heating program: true=heating ON, false = heating off
    private _slots: boolean[] = [];

    // threshold value for hot water
    private _minHwTemp: number;
    private _maxHwTemp: number;

    constructor(@inject(INJECTABLES.SlotsPerDay) protected slotsPerDay: number) {

        // set default values for hot water
        this._maxHwTemp = 0;
        this._minHwTemp = 0;

        // set defaults for heating
        for (let i = 0; i < this.slotsPerDay; i++) {
            this._slots.push(false);
        }
    }

    public getValue(slot: number): boolean {
        Validate.isInteger(slot, "slot number not numeric");

        if (slot < 0 || slot >= this.slotsPerDay) {
            throw new Error("Method not implemented.");
        }

        return this._slots[slot];
    }

    public getSnapshot(): ProgramSnapshot {
        return new ProgramSnapshot(this._minHwTemp, this._maxHwTemp, this._slots, this.slotsPerDay);
    }

    public get minHWTemp(): number {
        return this._minHwTemp;
    }

    public get maxHWTemp(): number {
        return this._maxHwTemp;
    }

    public get id(): string {
        return this._id;
    }

    public set id(id: string) {
        this._id = id;
    }

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get slots(): boolean[] {
        return this._slots;
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
            this._slots[from + i] = state[i];
        }
    }

    public loadFrom(src: any): void {
        let valid: boolean = true;

        // validate the input string
        if (!src ||
            (typeof src.hwmax !== "number") ||
            (typeof src.hwmin !== "number") ||
            !Array.isArray(src.slots) ||
            src.slots.length !== this.slotsPerDay) {

            // reject the data
            valid = false;

        } else {
            // test each slot is boolean
            for (const slot of src.slots) {
                if (typeof slot !== "boolean") {
                    valid = false;
                    break;
                }
            }
        }

        if (valid) {
            this.setHWTemps(src.hwmin, src.hwmax);

            for (let i: number = 0; i < src.slots.length; i++) {
                this._slots[i] = src.slots[i];
            }
        } else {
            throw new Error("Invalid or missing values in json.");
        }
    }

    public toStorable() {
        return {
            _id: this.id,
            maxHwTemp: this.maxHWTemp,
            minHwTemp: this.minHWTemp,
            name: this.name,
            slots: this._slots,
        };
    }

    private validateSlotNumber(...args: number[]) {
        args.forEach((arg: number) => {
            if (isNaN(arg) || arg < 0 || arg >= this.slotsPerDay) {
                throw new Error("Slots per day out of range");
            }
        });
    }
}
