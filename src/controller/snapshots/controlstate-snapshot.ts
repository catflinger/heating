/**
 * data class to encapsulate control state
 */
export class ControlStateSnapshot {

    constructor(
        public heating: boolean,
        public hotWater: boolean) {
    }

    public clone(): ControlStateSnapshot {
        return new ControlStateSnapshot(
            this.heating,
            this.hotWater);
    }
}
