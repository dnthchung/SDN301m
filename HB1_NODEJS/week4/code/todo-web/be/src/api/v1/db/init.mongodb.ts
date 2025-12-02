import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectRepo = async () => {
    try {
        const connectString = process.env.MONGO_URI || "";
        if (!connectString) {
            console.log("MONGO_URI is not defined in .env");
            return;
        }
        await mongoose.connect(connectString);
        console.log("Connect to Mongo Success");
    } catch (error) {
        console.log("Error Connect to Mongo", error);
    }
};

export default connectRepo;
