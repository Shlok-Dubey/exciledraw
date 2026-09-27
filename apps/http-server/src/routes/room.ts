import { Request, Response, Router } from 'express'
import { CheckToken } from '../middleware.js';
import { genRoom } from '../client.js';

export const room : Router = Router();

room.post('/create',CheckToken ,async(req:Request,res: Response)=>{
    try{
        const userId = req.userId as string ; 
    const response =  await genRoom(userId)
    if( !response.success){
        res.status(404).json({
            success : false,
            message : 'Unable to create room'
        })
    }

    res.status(200).json({
        success : true,
        message : 'Room created',
        RoomID : response.roomId
    })}catch(error){
        res.status(500).json({
            success : false ,
            message : 'Internal server error'
        })
    }

})