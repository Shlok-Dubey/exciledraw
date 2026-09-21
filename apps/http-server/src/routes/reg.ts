import express from 'express'
import type { Request, Response, Router } from 'express'

export const reg : Router = express.Router()

reg.all('',(req : Request, res : Response)=>{
    res.status(200).json({
        message : 'please send the valid request'
    })
})
