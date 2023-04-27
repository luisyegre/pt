import { Router } from "express";

export default interface IRouter {
    addRoutes(name:string,routes:Router,config:{ needSigin:boolean })
}