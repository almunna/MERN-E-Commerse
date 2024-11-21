import express, { response } from "express";
import cors from "cors";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet"
import connectDb from "./config/connectDb.js";

dotenv.config();
const PORT = 8000 || process.env.PORT

const app =express()
app.use(cors ({
    Credential: true,
    origin: process.env.FRONTEND_URL
}))

app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy : false
}))

app.get("/", (req, res) =>{
     res.json({
        message : "server is running"
     })
})
connectDb().then(() => {app.listen (PORT, () =>{
    console.log ("Server is running at", PORT)
})})