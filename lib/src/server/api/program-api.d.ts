import { Router } from "express";
import { IApi } from "../../controller/types";
export declare class ProgramApi implements IApi {
    private programManager;
    addRoutes(router: Router): void;
}
