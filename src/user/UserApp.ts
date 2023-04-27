import Io from "../app/interfaces/Io";
import IRouter from "../app/interfaces/Router";
import UserController from "./UserController";

export default class UserApp{
    mount(app:IRouter&Io){
        const controller = new UserController()
        app.addRoutes('user',controller.routes(), {needSigin:true})
    }
}