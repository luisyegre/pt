import Io from "./Io";
import IRouter from "./Router";

export default interface IApp{
    mount(app:IRouter&Io)
}