import { Socket } from "socket.io";
import { UserLoader } from "./services/UserLoader";
import { Request, Response, Router } from "express";

export default class UserController{
    async myItems(req:Request, res:Response){
        try{
            const user = await UserLoader.load(req.user.id)
            console.log(user)
            res.send({
                msg:"items",
                data:user.ItemModels
            })
        }catch(err){
            console.error(err)
            res.status(400).send({msg:"errors obtaining data"})
        }
    }
    
    async addItem(req:Request, res:Response){
        const userLoad = await UserLoader.load(req.user.id)
        await userLoad.addItem(req.body.content)
        res.status(201).send({
            msg:"item created",
        })
    }
    async deleteItem(req:Request, res:Response){
        const userLoad = await UserLoader.load(req.user.id)
        await userLoad.removeItem(Number(req.params.itemId))
        res.status(201).send({
            msg:"item deleted",
        })
    }
    async updateItem(req:Request, res:Response){
        const userLoad = await UserLoader.load(req.user.id)
        await userLoad.updateItem(Number(req.params.itemId),req.body.content)
        res.status(201).send({
            msg:"item updated",
        })
    }
    routes(){
        const router = Router()
        router.get('/items',this.myItems)
        router.put('/items/:itemId',this.updateItem)
        router.delete('/items/:itemId',this.deleteItem)
        router.post('/items',this.addItem)
        return router
    }
} 