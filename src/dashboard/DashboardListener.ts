import { Socket } from "socket.io";
import Items from "../items/Items";

export default class DashboardListener{
    async join(socket:Socket,data) {
        socket.join('dashboard')
        socket.emit("joined","you have joined to dashboard")
    }
    async sync(socket:Socket,data){
        const items = await Items.getAll()
        socket.to('dashboard').emit("sync",items)
    }
    async leave(socket:Socket,data){
        socket.leave('dashboard')
        socket.disconnect(true)
    }
}