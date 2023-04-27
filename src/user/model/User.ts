import { Model, DataTypes } from "sequelize";
import ItemModel from "../../items/model/Item";

export default class UserModel extends Model {
    declare email:string
    declare name:String
    declare id:number
    declare ItemModels:ItemModel[]
    private password:string
    passwordEqual(password:string){
        return this.password === password
    }
    async addItem(content:string){
        await ItemModel.create({content,UserModelId: this.id })
    }
    async removeItem(id:number){
        const item = await ItemModel.findByPk(id)
        await item.destroy()
    }
    async updateItem(id:number, content:string){
        const item =await ItemModel.findByPk(id)
        item.content = content
        await item.save()
    }

}
