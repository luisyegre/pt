import User from "../model/User";
import UserLoginDTO from "../../login/dto/userLogin";
import jwt from "jsonwebtoken"

export default class LoginUser {
    static async loginIfExist(userData:UserLoginDTO){
        const user = await User.findOne({ 
            where: { email: userData.email}
        })
        if ((user === null) || !user.passwordEqual(userData.password)){
            return ""
        }
        const token = jwt.sign(
            { email: user.email, id:user.id },
            process.env.TOKEN_SECRET
        )
        return token
    }
}