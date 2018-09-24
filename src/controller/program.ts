import * as Debug from "debug";
import * as fs from "fs";
import { inject, injectable } from "inversify";
import { v4 as guid } from "uuid";

import { Validate } from "../common/validate";
import { ProgramSnapshot } from "./snapshots/program-snapshot";
import { IControllerSettings, INJECTABLES, IProgram } from "./types";

const debug = Debug("prog");

@injectable()
export class Program implements IProgram {
    // general attributes
    private _id: string;
    private _name: string;

    // array to hold the heating program: true=heating ON, false = heating off
    private _slots: boolean[] = [];

    // threshold value for hot water
    private _minHWTemp: number;
    private _maxHWTemp: number;

    constructor(@inject(INJECTABLES.SlotsPerDay) protected slotsPerDay: number) {
        this.loadDefaults();
    }

    public getValue(slot: number): boolean {
        Validate.isInteger(slot, "slot number not numeric");

        if (slot < 0 || slot >= this.slotsPerDay) {
            throw new Error("Method not implemented.");
        }

        return this._slots[slot];
    }

    public getSnapshot(): ProgramSnapshot {
        return new ProgramSnapshot(this._id, this._name, this._minHWTemp, this._maxHWTemp, this._slots);
    }

    public get minHWTemp(): number {
        return this._minHWTemp;
    }

    public get maxHWTemp(): number {
        return this._maxHWTemp;
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

    public setRange(state: boolean[], from: number, to: number): void {

        this.validateSlotNumber(from, to);

        if (!state || from > to || state.length < to - from + 1) {
            throw new Error("invalid parameters for setRange");
        }

        for (let i = 0; i <= to - from; i++) {
            this._slots[from + i] = state[i];
        }
    }

    public loadDefaults() {
        // set default values for hot water
        this._maxHWTemp = 50;
        this._minHWTemp = 40;
        this._name = "default";
        this._id = guid();

        // set defaults for heating
        for (let i = 0; i < this.slotsPerDay; i++) {
            this._slots.push(false);
        }
    }

    public loadFromSnapshot(src: ProgramSnapshot) {
        if (src.id) {
            this._id = src.id;
        }
        this._maxHWTemp = src.maxHWTemp;
        this._minHWTemp = src.minHWTemp;
        this._name = src.name;

        for (let i: number = 0; i < src.slots.length; i++) {
            this._slots[i] = src.slots[i];
        }
    }

    private validateSlotNumber(...args: number[]) {
        args.forEach((arg: number) => {
            if (isNaN(arg) || arg < 0 || arg >= this.slotsPerDay) {
                throw new Error("Slots per day out of range");
            }
        });
    }
}
