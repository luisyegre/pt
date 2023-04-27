import CreateUserDto from "../../login/dto/CreateUser";
import UserModel from "../model/User";

export default class UserRegister{
    static async registerIfNotExist(userData:CreateUserDto){
        const user = await UserModel.findOne({
            where:{email:userData.email},
        })[0]
        if(user) throw new Error(JSON.stringify({ code:"ALREADY_EXIST", detail:"user already exist" }))
        
        return await UserModel.create({...userData})
    }
}