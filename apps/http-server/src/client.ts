import {db} from '@repo/database/client'
import type {ResponseOfCreate, CreateUserInput} from './index.d.js'

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
        return {
            success : false,
            error : error instanceof Error ? error.message : "Failed to create user"
        }
    }
}