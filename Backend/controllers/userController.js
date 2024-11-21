import UserModel from "../models/userModel.js";

async function registerUser(req, res) {
    try {
        const  {name, email, password} = req.body;

        if (!name || !email || !password){
           return res.status(400).json({ message: "Provide name, email, password"
    })}
        const user = await UserModel.findOne({email})
        if(user){
            return res.json({
                message: "Email already exist",
                error: true,
                success: false
            })
        }

    } catch (error) {
        return res.status(500).json({
        message: error.message || error,
        error: true,
        success: false

        })}
}