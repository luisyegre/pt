import UserModel from "../user/model/User";
import Item from "./model/Item";

export default class Items {
    static async getAll(){
        const items= await Item.findAll({include:[UserModel]})
        return items
    }
}