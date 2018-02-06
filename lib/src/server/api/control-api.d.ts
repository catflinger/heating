import { Router } from "express";
import { IApi } from "../../controller/types";
export declare class ControlApi implements IApi {
    private controller;
    private utils;
    addRoutes(router: Router): void;
}
