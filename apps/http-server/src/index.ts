import express from 'express'
import { auth } from './routes/auth.js'
import { reg } from './routes/reg.js'
import dotenv from 'dotenv'

const app = express()
dotenv.config()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use('/api/v1/auth', auth )
app.use('*',reg)

app.listen(PORT,()=>{
    console.log('httpserver is working')
})