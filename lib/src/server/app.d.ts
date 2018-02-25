import * as express from "express";
import { IApi, IController } from "../controller/types";
export declare class App {
    private controller;
    private configApi;
    private statusApi;
    private programApi;
    private overrideApi;
    express: express.Application;
    constructor(controller: IController, configApi: IApi, statusApi: IApi, programApi: IApi, overrideApi: IApi);
    start(): express.Application;
}
