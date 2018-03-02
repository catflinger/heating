import { ISnapshot } from "./snapshot";

export class ProgramSnapshot implements ISnapshot<ProgramSnapshot> {

    constructor(
        private _id: string,
        private _name: string,
        private _minHwTemp: number,
        private _maxHwTemp: number,
        private _slots: boolean[],
        private _slotsPerDay: number) {
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get minHwTemp(): number {
        return this._minHwTemp;
    }

    public get maxHwTemp(): number {
        return this._maxHwTemp;
    }

    public get slots(): boolean[] {
        return this._slots;
    }

    public get slotsPerDay(): number {
        return this._slotsPerDay;
    }

    public clone(): ProgramSnapshot {
        const slotArray: boolean[] = [];
        this.slots.forEach((slot) => slotArray.push(slot));

        return new ProgramSnapshot(
            this._id,
            this._name,
            this._minHwTemp,
            this._maxHwTemp,
            slotArray,
            this._slotsPerDay);
    }

    public toStorable(): any {
        const slotArray: boolean[] = [];
        this.slots.forEach((slot) => slotArray.push(slot));

        return {
            id: this._id,
            maxHwTemp: this._maxHwTemp,
            minHwTemp: this._minHwTemp,
            name: this._name,
            slotArray,
            slotsPerDay: this._slotsPerDay,
        };
    }

    public toJson(): string {
        return JSON.stringify(this.toStorable());
    }
}
