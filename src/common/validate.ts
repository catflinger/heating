export class Validate {
    public static isBoolean(val: any, msg: string): boolean {
        if (typeof val !== "boolean") {
            throw new Error("invalid boolean data " + msg);
        }
        return val;
    }

    public static isNumber(val: any, msg: string): number {
        if (typeof val !== "number") {
            throw new Error("invalid numeric data " + msg);
        }
        return val;
    }

    public static isInteger(val: any, msg: string): number {
        if (typeof val !== "number" ||
            !isFinite(val) ||
            Math.floor(val) !== val) {
            throw new Error("invalid numeric data " + msg);
        }
        return val;
    }
}
