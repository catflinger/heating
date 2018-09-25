import { v4 as guid } from "uuid";

export class ProgramSnapshot {

    public static fromJson(json: string): ProgramSnapshot {
        const src = JSON.parse(json);

        if ((typeof src.maxHWTemp !== "number") ||
            (typeof src.minHWTemp !== "number")) {
            throw new Error("hwmax or hwmin not numeric loading program.");
        }
        if (!Array.isArray(src.slots)) {
            throw new Error("slot array missing from source data loading program.");
        }
        if (src.minHWTemp < 10 || src.maxHWTemp < 10 || src.minHWTemp > 60 || src.maxHWTemp > 60 || src.maxHWTemp - src.minHWTemp < 5) {
            throw new Error("HW temperature value out of range");
        }

        for (const slot of src.slots) {
            if (typeof slot !== "boolean") {
                throw new Error("slot array must contain booleans in source data loading program.");
            }
        }

        // if id is present and a string use it, otherwise create a new one
        const id: string = src.id && typeof src.id === "string" ? src.id : guid();

        // name is optional
        const name: string = (src.name && typeof src.name === "string") ? src.name : "not named";

        const slots: boolean[] = [];

        for (const slot of src.slots) {
            slots.push(slot);
        }

        return new ProgramSnapshot(
            id,
            name,
            src.minHWTemp,
            src.maxHWTemp,
            slots,
        );
    }

    constructor(
        private _id: string,
        private _name: string,
        private _minHWTemp: number,
        private _maxHWTemp: number,
        private _slots: boolean[],
    ) {
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

    public toJson(): string {
        return JSON.stringify({
            id: this.id,
            maxHWTemp: this.maxHWTemp,
            minHWTemp: this.minHWTemp,
            name: this.name,
            slots: this.slots,
        });
    }
}
