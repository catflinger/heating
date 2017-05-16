import { injectable } from "inversify";
import { IProgram } from "./types";

@injectable()
export class Program implements IProgram {
    private readonly _slotsPerDay = 12 * 24;

    // array to hold the heating program: true=heating ON, false = heating off
    private slots: boolean[] = [];

    // threshold value for hot water
    private _minHwTemp: number = 40;
    private _maxHwTemp: number = 50;

    constructor() {
        for (let i = 0; i < this._slotsPerDay; i++) {
            this.slots.push(false);
        }
    }

    // constant for number of programmable time slots in the day
    public get slotsPerDay(): number {
        return this._slotsPerDay;
    }

    public getValue(slotNumber: number): boolean {
        this.validateSlotNumber(slotNumber);
        return this.slots[slotNumber];
    }

    public get minHWTemp(): number {
        return this._minHwTemp;
    }

    public get maxHWTemp(): number {
        return this._maxHwTemp;
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

    private validateSlotNumber(...args: number[]) {
        args.forEach((arg: number) => {
            if (isNaN(arg) || arg < 0 || arg >= this._slotsPerDay) {
                throw new Error("Slots per day out of range");
            }
        });
    }
}
