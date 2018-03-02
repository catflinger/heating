export interface ISnapshot<T> {
    toStorable(): any;
    toJson(): string;
    clone(): T;
}
