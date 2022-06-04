import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from "mongoose";
import router from './router/index.js'
import ErrorMiddleware from "./middlewares/error-middleware.js";
const app = express()
const PORT = process.env.PORT || 5304



app.use(express.json());
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use('/api', router)
app.use(ErrorMiddleware)
const start = async() => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, ()=>console.log(`server started on PORT: ${PORT}`))
    }catch (e) {
        console.log(e)
    }
}

start()