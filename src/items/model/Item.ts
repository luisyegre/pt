import { Model } from "sequelize";

 

export default class ItemModel extends Model {
    declare content: string
    declare userId: number
}
