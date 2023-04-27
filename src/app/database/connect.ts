import { Sequelize } from 'sequelize'
export default function connection(){
    const dbName = process.env.BD_NAME||"pti"
    const dbUser = process.env.DB_USER||"root"
    const dbPassword =  process.env.DB_PASSWORD||""
    const sequelize = new Sequelize(dbName, dbUser,dbPassword,{
        host:"localhost",
        dialect:"mysql"
    })
    sequelize.authenticate()
    .then(()=>{
        console.log("conneted to database mysql")
    }).catch(err=>{
        console.error(err)
    })
    return sequelize
}