import "reflect-metadata";
import { ControlStateSnapshot, DeviceStateSnapshot, IControllable } from "./types";
export declare class System implements IControllable {
    private boiler;
    private hwPump;
    private chPump;
    applyControlState(state: ControlStateSnapshot): void;
    getDeviceState(): DeviceStateSnapshot;
}
