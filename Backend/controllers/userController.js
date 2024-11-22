import sendEmail from "../config/SENDeMAIL.JS";
import UserModel from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import verifyEmail from "../utils/verifyEmail.js";

async function registerUser(req, res) {
    try {
        const  {name, email, password} = req.body;

        if (!name || !email || !password){
           return res.status(400).json({ 
                message: "Provide name, email, password",
                error: true,
                success: false
    })}
        const user = await UserModel.findOne({email})
        if(user){
            return res.json({
                message: "Email already exist",
                error: true,
                success: false
            })
        }
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        const payload ={
            name, email, passsword :hashPassword
        }
        const newUSer = new UserModel (payload);
        const save = await newUSer.save(0);

        const veryfyUrl = `{process.envFRONTEND_URL}/verify-email?code=${save._id}`

        const veryfyEmail = await sendEmail({
            sendTo: email,
            subject: "Verification Email",
            html: verifyEmail({
                name,
                url : veryfyUrl
            })

        })
        return res.json({
            message: "User registration successfull",
            error: false,
            success: true,
            data : save
        })

    } catch (error) {
        return res.status(500).json({
        message: error.message || error,
        error: true,
        success: false

        })}
}