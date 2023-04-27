import { Socket } from "socket.io";
import Io from "../app/interfaces/Io";
import IRouter from "../app/interfaces/Router";
import IApp from "../app/interfaces/app";
import DashboardListener from "./DashboardListener";

export default class DashboardApp implements IApp{
    mount(app:IRouter&Io){
        const controller = new DashboardListener()
        app.registerListener([
            {name:'dashboard/join', listener: controller.join},
            {name:'dashboard/leave', listener: controller.leave},
            {name:'dashboard/sync', listener: controller.sync},
        ])
    }
}