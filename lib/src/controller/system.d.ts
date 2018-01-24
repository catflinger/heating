import "reflect-metadata";
import { ControlStateSnapshot, DeviceStateSnapshot, IControllable } from "./types";
export declare class System implements IControllable {
    private boiler;
    private hwPump;
    private chPump;
    private settings;
    start(): void;
    applyControlState(state: ControlStateSnapshot): void;
    getDeviceState(): DeviceStateSnapshot;
}
