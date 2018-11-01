export class SensorSnapshot {

    constructor(
        public id: string,
        public description: string,
        public reading: number,
        public role: string) {
    }

    public clone(): SensorSnapshot {
        return new SensorSnapshot(this.id, this.description, this.reading, this.role);
    }

    public toJson(): string {
        return JSON.stringify(this);
    }
}
