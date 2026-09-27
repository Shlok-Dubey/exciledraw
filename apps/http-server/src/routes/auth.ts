import { Request, Response, Router } from 'express'
import {z} from 'zod'
import argon2 from 'argon2'
import { LoginSchema, ResponseOfCreate } from '../index.d.js'
import { addUser, getPassword } from '../client.js'
import { generateToken } from '../middleware.js'


const UserCreate = z.object({
    username : z.string().max(12).min(1),
    password : z.string().max(20).min(1),
    firstName : z.string().max(15).min(1),
    email : z.email().min(1)
})


export const auth : Router = Router()

auth.post('/signup', async (req: Request, res: Response) => {
    try {
        const data = UserCreate.safeParse(req.body);
        if (!data.success) {
            return res.status(400).json({
                success: false,
                message: data.error.flatten()
            });
        }

        const { email, username, password, firstName } = data.data;
        const hashedPass = await argon2.hash(password);
        const response: ResponseOfCreate = await addUser({
            email, username, password: hashedPass, firstName
        });

        if (!response.success) {
            return res.status(400).json({ success: false, message: response.error });
        }

        return res.status(201).json({ success: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

auth.post('/login',async (req : Request ,res : Response)=>{
    try {
        const {username, hashPassword } = req.body as LoginSchema;
        console.log(`username : ${username} , hashPassword : ${hashPassword}`)
        const  user = await getPassword(username);
        console.log(user)
        if (!user.success) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
          }
        const userExist = await argon2.verify(user.password , hashPassword)
        console.log(userExist)
        if(!userExist)  {
            return res.status(401).json({ success: false, message: 'Invalid credentials' })
        };
        const token = generateToken(user.id)
        console.log(token)

        res.status(200).cookie('auth',token,{
            'httpOnly': false,
        }).json({
            success : true,
            message : 'logedin'
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            message : 'Internal server Error'
        })
    } 
    
})