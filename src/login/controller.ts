import { IRouter, Request, Response, Router } from "express";
import UserLoginDTO from "./dto/userLogin";
import LoginUser from "../user/services/LoginUser";
import { IController } from "../app/interfaces/Controller";
import CreateUserDto from "./dto/CreateUser";
import RegisterUser from "../user/services/UserRegister";
import UserRegister from "../user/services/UserRegister";
import { Server } from "socket.io";

export default class LoginController implements IController{
    async sigin(req:Request, res:Response){
        const userData:UserLoginDTO = req.body
        if (userData.email.split('@').length !== 2){
            return res.send({ msg: "email bad format" })
        }
        try{

            const token = await LoginUser.loginIfExist(userData)
            //si no hay token es por que el usuario no se encontro

            if (token === ""){
                return res.status(404).send({msg:"user not exist or password incorret"})
            }
            res.send({
                msg:"logged",
                token
            })
        } catch(error){
            return res.status(400).send({msg:error})
        }
    }
    async sigup(req:Request,res:Response){
        const userData:CreateUserDto = req.body
        if (userData.email.split('@').length !== 2){
            return res.send({ msg: "email bad format" })
        }
        if (userData.password !== userData.password2){
            return res.send({ msg: "password don't match" })
        }
        if (!userData.name){
            return res.send({ msg: "send name" })
        }
        try{
            const user = await UserRegister.registerIfNotExist(userData)
            return res.status(201).send({
                msg:"usuario creado",
                user:user.id
            })
        }catch(error){
            const err =JSON.parse(error)
            return res.status(400).send({
                msg:err.code === 'ALREADY_EXIST'? err.detail: "we couldnot register you"  
            })
        }
        //si no hay token es por que el usuario no se encontro
    }
    
    routes(): Router {
        const router = Router()
        router.post('/sigin',this.sigin)
        router.post('/sigup',this.sigup)
        return router
    }
}