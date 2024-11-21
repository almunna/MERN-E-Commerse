import UserModel from "../models/userModel.js";
import bcryptjs from "bcryptjs";

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

    } catch (error) {
        return res.status(500).json({
        message: error.message || error,
        error: true,
        success: false

        })}
}