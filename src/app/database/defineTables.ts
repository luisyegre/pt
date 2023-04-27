import { DataTypes } from "sequelize";
import Item from "../../items/model/Item";
import connection from "./connect";
import User from "../../user/model/User";

const sequelize = connection()

Item.init({
    content:DataTypes.TEXT,
},{ sequelize })

User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
},{ sequelize })

Item.belongsTo(User)
User.hasMany(Item)

async function syncAllDatabeTables(){
    await sequelize.sync({ force: true })
    console.log("sync table oto database")
}

export default syncAllDatabeTables

