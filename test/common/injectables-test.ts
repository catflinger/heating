export const TestingInjectables = {
    Clean: Symbol("Clean"),
}

export interface IClean {
    clean(options: any): void;
}