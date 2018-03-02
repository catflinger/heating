import { ISnapshot } from "./snapshot";

export class OverrideSnapshot implements ISnapshot<OverrideSnapshot> {

    constructor(
        private _start: number,
        private _duration: number,
        private _state: boolean,
        private _date: Date) {
    }

    public clone(): OverrideSnapshot {
        return new OverrideSnapshot(
            this._start,
            this._duration,
            this._state,
            new Date(this._date));
    }

    public get start(): number {
        return this._start;
    }

    public get duration(): number {
        return this._duration;
    }

    public get state(): boolean {
        return this._state;
    }

    public get date(): Date {
        return new Date(this._date);
    }

    public toStorable(): any {
        return {
            date: this.date,
            duration: this.duration,
            start: this.start,
            state: this.state,
        };
    }

    public toJson(): string {
        return JSON.stringify(this.toStorable());
    }
}
