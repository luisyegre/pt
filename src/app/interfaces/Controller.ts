import { IRouter } from "express";
import Io from "./Io";

export interface IController {
    routes(io?:Io):IRouter
}