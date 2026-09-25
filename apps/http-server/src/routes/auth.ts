import express from 'express'
import type { Request, Response, Router } from 'express'
import {z} from 'zod'
import argon2, { argon2d, argon2i, argon2id } from 'argon2'
import { ResponseOfCreate } from '../index.d.js'
import { addUser } from '../client.js'


const UserCreate = z.object({
    username : z.string().max(12).min(1),
    password : z.string().max(20).min(1),
    firstName : z.string().max(15).min(1),
    email : z.email().min(1)
})


export const auth : Router = express.Router()

auth.post('/signup', async (req : Request, res : Response)=>{
    const data = UserCreate.safeParse(req.body)
    if (!data.success) {
        res.status(400).json({message:data.error,success:false});
      } else {
        const {email,username,password,firstName} = data.data
        const hashedPass = await argon2.hash(password)
        const response : ResponseOfCreate = await addUser({email,username,password : hashedPass,firstName})
        if (!response.success) {
            res.status(400).json({
                success : false,
                message : response.error
            })
        } else {
            res.status(201).json({
                success : true,
            })
        }
      }
})

auth.post('/login',(req : Request ,res : Response)=>{
    const data = req.body
    
})