
export type ILogLogstCallback = (err: Error, logList: LogInfo[]) => void;

export class LogInfo {
    constructor(
        private _id: string,
        private _date: Date,
        private _size: number) {
    }

    public get id(): string {
        return this._id;
    }
    public get date(): Date {
        return new Date(this._date);
    }
    public get size(): number {
        return this._size;
    }

}
