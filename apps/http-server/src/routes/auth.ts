import express from 'express'
import type { Request, Response, Router } from 'express'
import {string, z} from 'zod'
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
        const response : ResponseOfCreate = await addUser({email,username,password,firstName})
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

})