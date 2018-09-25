
/**
 * data class to encapsulate control state
 */
export class ControlStateSnapshot {
    public heating: boolean;
    public hotWater: boolean;

    constructor(heating: boolean, hotWater: boolean) {
        this.heating = heating;
        this.hotWater = hotWater;
    }

    public clone(): ControlStateSnapshot {
        return new ControlStateSnapshot(
            this.heating,
            this.hotWater);
    }

    public toJson(): string {
        return JSON.stringify(this);
    }
}
