
/**
 * data class to encapsulate device state
 */
export class DeviceStateSnapshot {

    constructor(
        public boiler: boolean,
        public hwPump: boolean,
        public chPump: boolean) {
        }

    public clone() {
         return new DeviceStateSnapshot(
             this.boiler,
             this.hwPump,
             this.chPump);
     }
}
