import { IOverride, OverrideSnapshot } from "./types";
export declare class Override implements IOverride {
    protected slotsPerDay: number;
    private clock;
    private override;
    refresh(): void;
    getSnapshot(): OverrideSnapshot;
    setOverride(duration: number): void;
    clearOverride(): void;
}
