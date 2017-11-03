import { IOverride, OverrideSnapshot } from "./types";
export declare class Override implements IOverride {
    private override;
    private clock;
    private setttings;
    refresh(): void;
    getSnapshot(): OverrideSnapshot;
    setOverride(duration: number): void;
    clearOverride(): void;
}
