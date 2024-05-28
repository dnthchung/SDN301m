//import mongoose module
import mongoose from "mongoose";

const connectDB = () => {
  try {
    const connection = mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    return connection;
  } catch (err) {
    throw new Error(err.toString());
  }
};

export default connectDB;
