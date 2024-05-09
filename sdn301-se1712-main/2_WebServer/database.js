import mongoose from "mongoose";

// Create connection DB
const connectDB = () => {
    try {
        const db = mongoose.connect(process.env.URI_MONGODB);
        console.log('Connect to MongoDB success');
        return db;
    } catch (error) {
        throw new Error(error.toString());
    }
}

export default connectDB;