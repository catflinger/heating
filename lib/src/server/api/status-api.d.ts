import { Router } from "express";
import { IApi } from "../../controller/types";
export declare class StatusApi implements IApi {
    private controller;
    private utils;
    addRoutes(router: Router): void;
}
