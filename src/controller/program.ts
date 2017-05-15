import { injectable } from "inversify";
import { IProgram } from "./types";

@injectable()
export class Program implements IProgram {

    // array to hold the heating program: true=heating ON, false = heating off
    private slots: boolean[] = [];

    // threshold value for hot water
    private _minHwTemp: number = 40;
    private _maxHwTemp: number = 50;

    constructor() {
        for (let i = 0; i < this.slotsPerDay; i++) {
            this.slots.push(false);
        }
    }

    // constant for number of programmable time slots in the day
    public get slotsPerDay(): number {
        return 12 * 24;
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

    public setRange(state: boolean, from: number, to: number): void {
        this.validateSlotNumber(from, to);

        for (let i = from; i <= to; i++) {
            this.slots[i] = state;
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
