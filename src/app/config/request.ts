import UserLoginDTO from "../../login/dto/userLogin";
import { Request } from 'express'
declare global {
    namespace Express {
        interface Request {
            user?: UserLoginDTO
        }
    }
}