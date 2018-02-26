// TO DO:
export class ProgramSnapshot {

    constructor(
        public id: string,
        public name: string,
        public minHwTemp: number,
        public maxHwTemp: number,
        public slots: boolean[],
        public slotsPerDay: number) {
    }

    public clone(): ProgramSnapshot {
        const slotArray: boolean[] = [];
        this.slots.forEach((slot) => slotArray.push(slot));

        return new ProgramSnapshot(
            this.id,
            this.name,
            this.minHwTemp,
            this.maxHwTemp,
            slotArray,
            this.slotsPerDay);
    }
}
