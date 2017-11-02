// TO DO:
export class ProgramSnapshot {
    private _slots: boolean[] = [];

    // threshold value for hot water
    private _minHwTemp: number;
    private _maxHwTemp: number;
    private _slotsPerDay: number;

    constructor(minHwTemp: number, maxHwTemp: number, slots: boolean[], slotsPerDay: number) {
        this._maxHwTemp = maxHwTemp;
        this._minHwTemp = minHwTemp;
        slots.forEach((slot) => this._slots.push(slot));
        this._slotsPerDay = slotsPerDay;
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
}
