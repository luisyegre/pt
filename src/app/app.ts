import bodyParser from "body-parser"
import connection from "./database/connect"
import LoginApp from "../login/LoginApp"
import express,{Express, NextFunction, Request, Response, Router} from 'express'
import http from 'http'
import syncAllDatabeTables from "./database/defineTables"
import IsAuth from "../login/middleware/isauth"
import IRouter from "./interfaces/Router"
import { Server, Socket } from "socket.io"
import Io from "./interfaces/Io"
import DashboardApp from "../dashboard/DashboardApp"
import UserApp from "../user/UserApp"

class Listeners {
	static list:{name:string,listener:(socekt:Socket,data)=>Promise<void>}[] =[]
	static register(listener){
		Listeners.list.push(listener)
	}
	static mount(socket){
		Listeners.list.forEach(({name,listener})=>{
			socket.on(name,(data)=>listener(socket,data))
		})
	}
}

export default class App implements IRouter,Io{
	private app:Express
	private ioApp:Server
	private httpServer
	constructor(){
		this.app = express()
		this.httpServer = http.createServer(this.app)
		this.ioApp = new Server(this.httpServer)
	}
	config(){
		connection()
		this.app.use(bodyParser.urlencoded({ extended: true }))
		this.app.use(bodyParser.json())	
		this.app.use((req,res,next)=>{
			console.log("ye iam alive")
			next()
		})
	}
    addRoutes(name:string,routes:Router,{ needSigin }:{ needSigin:boolean }){
        this.app.use('/'+name,(req: Request, res: Response,next:NextFunction)=>{
            if ( needSigin) {
                return IsAuth(req,res,next)
            }
            next()
        },routes)
    }
	io(){
		return this.ioApp
	}
	mount({syncDb}){
		if (syncDb) {
            syncAllDatabeTables()
        }
        const loginApp = new LoginApp()
        const dashboardApp = new DashboardApp()
        const userApp = new UserApp()
		loginApp.mount(this)
		dashboardApp.mount(this)
		userApp.mount(this)
	}
	registerListener(listeners){
		listeners.forEach( listener => Listeners.register(listener)) 
	}
	onConnection(socket: Socket){
		Listeners.mount(socket)
		console.log("succefgul")
	}
	run(){
		this.ioApp.on('connection',this.onConnection)
		this.httpServer.listen(8080)
	}
}
