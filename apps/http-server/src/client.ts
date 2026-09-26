import {db} from '@repo/database/client'
import type {ResponseOfCreate, CreateUserInput, GetPasswordResult} from './index.d.js'


export async function addUser({email, username, password, firstName}:CreateUserInput):Promise<ResponseOfCreate>{
    try {
        const user = await db.orm.public.User.select("id").create({
            email,
            username ,
            password ,
            firstname : firstName
        })

        return {
            id : user.id,
            success : true
        }
    } catch (error) {
        console.error(error)
        return {
            success : false,
            error : error instanceof Error ? error.message : "Failed to create user"
        }
    }
}

export async function getPassword(username : string ):Promise<GetPasswordResult>{
    try {
        const user = await db.orm.public.User.select('id','password').where({username}).first()
        if(!user){
            throw new Error("no user exist");   
        }
        return {
            success : true,
            password : user.password,
            id : user.id
        }
    } catch (error) {
        return {
            success : false,
            error : error instanceof Error ? error.message : "Failed to get user"
        }
    }
}