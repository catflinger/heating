import { inject, injectable } from "inversify";
import "reflect-metadata";
import { ISwitchable } from "./types";

@injectable()
class Boiler implements ISwitchable {
    public get name(): string {
        return "boiler";
    }

    public get state(): boolean {
        return true;
    }

    public toggle(): boolean {
        return true;
    }

    public switch(state: boolean): void {
        // TO DO:
    }
}