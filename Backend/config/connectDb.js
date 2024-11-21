import mongoose from "mongoose";
import dotenv from"dotenv";

dotenv.config()

if (!process.env.MONGODB_URI) {
    throw new Error(
        "Database .env connection fail"
    )
}

async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database connection successful")

    } catch(error){
        console.log ("Database connection fail", error)
        process.exit(1)
    }
}

export default connectDb;