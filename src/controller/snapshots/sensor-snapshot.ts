
import { ISensor } from "../types";

export class SensorSnapshot {

    constructor(
        public id: string,
        public reading: number) {
    }

    public clone(): SensorSnapshot {
        return new SensorSnapshot(this.id, this.reading);
    }
}
