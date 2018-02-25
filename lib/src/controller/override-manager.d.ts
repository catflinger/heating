import { IOverrideManager, OverrideSnapshot } from "./types";
export declare class OverrideManager implements IOverrideManager {
    protected slotsPerDay: number;
    private clock;
    private overrides;
    refresh(): void;
    getSnapshot(): OverrideSnapshot;
    setOverride(duration: number): void;
    clearOverride(): void;
}
