import { ISnapshot } from "./snapshot";

/**
 * data class to encapsulate device state
 */
export class DeviceStateSnapshot implements ISnapshot<DeviceStateSnapshot> {

    constructor(
        private _boiler: boolean,
        private _hwPump: boolean,
        private _chPump: boolean) {
        }

    public clone() {
         return new DeviceStateSnapshot(
             this._boiler,
             this._hwPump,
             this._chPump);
     }

    public get boiler(): boolean {
        return this._boiler;
     }

    public get hwPump(): boolean {
        return this._hwPump;
    }

    public get chPump(): boolean {
        return this._chPump;
    }

    public toStorable(): any {
        return {
            boiler: this._boiler,
            chPump: this._chPump,
            hwPump: this._hwPump,
        };
    }

    public toJson(): string {
        return JSON.stringify(this.toStorable());
    }
}
