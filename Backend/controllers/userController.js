import UserModel from "../models/userModel.js";

async function registerUser(req, res) {
    try {

    } catch (error) {
        return res.status(500).json({
        message: error.message || error,
        error: true,
        success: false

        })}
}