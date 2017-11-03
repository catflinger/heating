import { IDigitalOutput } from "../../src/controller/types";
export declare class MockDigitalOutput implements IDigitalOutput {
    private pins;
    constructor();
    use(pin: number): void;
    read(pin: number): boolean;
    write(pin: number, state: boolean): void;
    private getPinIndex(pin);
}
