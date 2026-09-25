import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'

export function CheckToken(req: Request,res : Response, next : NextFunction){
    try {
        const cookie = req.cookies.auth;
        if (!cookie){
            res.status(404).json({
                success : false,
                message : "Not able to get cookie"
            })
        }

        const JWT_SECRET = process.env.JWT_SECRET || 'hello'
        const decode = jwt.verify(cookie,JWT_SECRET)
        req.userId = decode
    } catch (error) {
        
    } 

}

export function generateToken(){

}