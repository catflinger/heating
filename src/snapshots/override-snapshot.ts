export class OverrideSnapshot {
    private _startSlot: number;  // starting slot, 0 = first slot
    private _duration: number;   // number of slots
    private _state: boolean;     // required state true=ON, false=OFF
    private _date: Date;         // date this snapshot was created

    constructor(start: number, duration: number, state: boolean) {
        this._startSlot = Math.floor(start);
        this._duration = Math.floor(duration);
        this._state = state;
        this._date = new Date();
    }

    public clone() {
        const result: OverrideSnapshot = new OverrideSnapshot(this._startSlot, this._duration, this._state);
        result._date = this.date;

        return result;
    }

    public get start(): number {
        return this._startSlot;
    }

    public get duration() {
        return this._duration;
    }

    public get state() {
        return this._state;
    }

    public get date(): Date {
        return this._date;
    }
}
