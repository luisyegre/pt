import { Server, Socket } from "socket.io";

export default interface Io{
    io():Server
    registerListener(listeners:{ name:string, listener: (socket:Socket,data)=> Promise<void> }[])
}