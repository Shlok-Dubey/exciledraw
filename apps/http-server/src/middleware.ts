import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'

export function CheckToken(req: Request,res : Response, next : NextFunction){
    try {
        const cookie = req.cookies.auth;
        if (!cookie){
           throw new Error("Cookie not found");  
        }
        const JWT_SECRET = process.env.JWT_SECRET || 'hello'
        const decode = jwt.verify(cookie,JWT_SECRET)
        req.userId = decode
        next()
    } catch (error) {
        res.status(401).json({
            success : false,
            message : error
        })
    } 

}

export function generateToken(userId : number){
    const JWT_SECRET = process.env.JWT_SECRET || 'hello'
    const Id = String(userId)
    const token = jwt.sign(Id,JWT_SECRET)
    return token
}