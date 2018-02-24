import { Router } from "express";
import { IApi } from "../../controller/types";
export declare class StatusApi implements IApi {
    private controller;
    private utils;
    addRoutes(router: Router): void;
    private sendGetResponse(write, req, res, next);
    private controlResponse(snapshot);
    private deviceResponse(snapshot);
    private envResponse(snapshot);
    private overrideResponse(snapshot);
    private programResponse(snapshot);
}
