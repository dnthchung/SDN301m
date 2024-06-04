//khai bao mongoose
const e = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//nếu ở đây có role schema thì trong bên dưới sẽ nhúng roleSchema vào userSchema
//còn ếu không có thì như dưới

//khai bao schema
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    type: {
      type: String,
      enum: {
        values: ["system", "google", "facebook", "zalo"],
        message: "{VALUE} is not supported",
        required: true,
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

//để string thì tn model, còn để object thì tn schema
