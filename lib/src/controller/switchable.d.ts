import { ISwitchable } from "./types";
export declare class Switchable implements ISwitchable {
    name: string;
    gpioPath: string;
    readonly state: boolean;
    toggle(): void;
    switch(state: boolean): void;
}
