import LoginController from './controller'
import IRouter from '../app/interfaces/Router'
import { IController } from '../app/interfaces/Controller'
import Io from '../app/interfaces/Io'

export default class LoginApp {
	mount(app: IRouter&Io){
		const controller:IController = new LoginController()
		app.addRoutes('auth', controller.routes(), {needSigin:false})
	}
}