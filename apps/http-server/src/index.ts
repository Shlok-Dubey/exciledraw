import express from 'express'
import { auth } from './routes/auth.js'
import { reg } from './routes/reg.js'
//import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { db } from '@repo/database/client'
import { room } from './routes/room.js'


const app = express()
//dotenv.config()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use('/api/v1/auth', auth )
app.use('/api/v1/room', room)
app.use('/*splat',reg)

app.listen(PORT, async () => {
    console.log('DATABASE_URL is:', process.env['DATABASE_URL'])
    await db.connect({ url: process.env['DATABASE_URL']! })
    console.log('httpserver is working')
})