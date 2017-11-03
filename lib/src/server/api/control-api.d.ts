import { Router } from "@types/express";
import { IController } from "../../controller/types";
export declare class ControlApi {
    static addRoutes(router: Router, controller: IController): void;
}
