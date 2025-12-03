import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./api/v1/models/user.model";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/todo-db"
    );
    console.log("Connected to DB");

    const email = "admin@example.com";
    const password = "adminpassword";
    const fullName = "Super Admin";

    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const admin = new User({
      fullName,
      email,
      passwordHash,
      role: "admin",
    });

    await admin.save();
    console.log("Admin created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
