import ItemModel from "../../items/model/Item";
import UserModel from "../model/User";


export class UserLoader{
    static async load(pk){
        return await UserModel.findOne({ 
            where: { id: pk },
            include: ItemModel
        })
    }
}