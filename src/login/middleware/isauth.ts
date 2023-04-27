import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

export default function IsAuth(req:Request,res:Response,next:NextFunction){
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access denied.');
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid token.');
    }  
}