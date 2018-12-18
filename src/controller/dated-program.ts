import * as uuid from "uuid";

export class DatedProgram {
    public id: string;
    public programId: string;
    public activationDate: Date;

    constructor(programId: string, activationDate: Date | string) {
        this.activationDate = activationDate instanceof Date ? activationDate : new Date(activationDate);
        this.programId = programId;
        this.id = uuid.v4();
    }
}
