import "reflect-metadata";
import { Switchable } from "./switchable";
import { IControllerSettings } from "./types";
export declare class Boiler extends Switchable {
    private settings;
    constructor(settings: IControllerSettings);
}
