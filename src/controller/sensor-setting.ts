export class SensorSetting {

    constructor(
        public id: string,
        public description?: string,
        public role?: string,
        public position?: number,
        public deleted?: boolean,
        ) {
        const exp: RegExp = new RegExp("^[a-z0-9.-]+$", "i");
        if (!exp.test(id)) {
            throw new Error("ID for sensor settingis missing or contains invalid characters");
        }
    }

    public copyOf(): SensorSetting {
        return new SensorSetting(
            this.id,
            this.description,
            this.role,
            this.position,
            this.deleted);
    }
}
