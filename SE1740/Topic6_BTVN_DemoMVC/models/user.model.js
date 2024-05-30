import mongoose, { Schema } from "mongoose";
import Role from "./role.model.js";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: function (v) {
          // Regular expression for email (contains @ and no whitespace)
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email number!`,
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          // Regular expression for password validation
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            v
          );
        },
        message: (props) =>
          `Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, one special character, and have no spaces!`,
      },
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: [0, "Age must be greater than 0"],
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          // Regular expression for phone number (starts with 0 and contains 10 digits)
          return /^0\d{9}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    type: {
      type: String,
      required: true,
      enum: ["system", "google", "facebook"],
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "role",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
export default User;
