import { DatedProgram } from "./dated-program";

export class ProgramConfig {
    public saturdayProgramId: string;
    public sundayProgramId: string;
    public weekdayProgramId: string;
    public datedPrograms: DatedProgram[] = [];
}
