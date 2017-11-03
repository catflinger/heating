import { ISwitchable } from "./types";
export declare class Switchable implements ISwitchable {
    private _name;
    private _pin;
    private gpio;
    constructor(name: string, pin: number);
    readonly name: string;
    readonly state: boolean;
    init(): void;
    toggle(): void;
    switch(state: boolean): void;
}
