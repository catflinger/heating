import { Container } from "inversify";
import "reflect-metadata";
import { IController, Snapshot } from "./types";
export declare class Controller implements IController {
    private currentControlState;
    private strategy;
    private settings;
    private environment;
    private programManager;
    private clock;
    private override;
    private system;
    constructor(container: Container);
    start(): void;
    getSnapshot(): Snapshot;
    setOverride(duration: number): void;
    clearOverride(): void;
    refresh(): void;
}
