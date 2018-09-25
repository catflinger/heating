export class SensorSnapshot {

    constructor(
        public id: string,
        public description: string,
        public reading: number) {
    }

    public clone(): SensorSnapshot {
        return new SensorSnapshot(this.id, this.description, this.reading);
    }

    public toJson(): string {
        return JSON.stringify(this);
    }
}
