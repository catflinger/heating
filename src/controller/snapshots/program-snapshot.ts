import { ISnapshot } from "./snapshot";

export class ProgramSnapshot implements ISnapshot<ProgramSnapshot> {

    constructor(
        private _id: string,
        private _name: string,
        private _minHWTemp: number,
        private _maxHWTemp: number,
        private _slots: boolean[],
        private _slotsPerDay: number) {
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get minHWTemp(): number {
        return this._minHWTemp;
    }

    public get maxHWTemp(): number {
        return this._maxHWTemp;
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
            this._minHWTemp,
            this._maxHWTemp,
            slotArray,
            this._slotsPerDay);
    }

    public toStorable(): any {
        const slotArray: boolean[] = [];
        this.slots.forEach((slot) => slotArray.push(slot));

        return {
            id: this._id,
            maxHWTemp: this._maxHWTemp,
            minHWTemp: this._minHWTemp,
            name: this._name,
            slotArray,
            slotsPerDay: this._slotsPerDay,
        };
    }

    public toJson(): string {
        return JSON.stringify(this.toStorable());
    }
}
