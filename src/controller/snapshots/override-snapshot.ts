
export class OverrideSnapshot {

    constructor(
        public start: number,
        public duration: number,
        public state: boolean,
        public date: Date) {
    }

    public clone(): OverrideSnapshot {
        return new OverrideSnapshot(
            this.start,
            this.duration,
            this.state,
            new Date(this.date));
    }

    public toJson(): string {
        return JSON.stringify(this);
    }
}
