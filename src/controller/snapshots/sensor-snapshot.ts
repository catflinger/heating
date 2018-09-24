import { ISensor } from "../types";

export class SensorSnapshot {

    constructor(
        private _id: string,
        private _description: string,
        private _reading: number) {
    }

    public clone(): SensorSnapshot {
        return new SensorSnapshot(this._id, this._description, this._reading);
    }

    public get id(): string {
        return this._id;
    }

    public get description(): string {
        return this._description;
    }

    public get reading(): number {
        return this._reading;
    }

    public toStorable(): any {
        return {
            description: this._description,
            id: this._id,
            reading: this._reading,
        };
    }

    public toJson(): string {
        return JSON.stringify(this.toStorable());
    }
}
