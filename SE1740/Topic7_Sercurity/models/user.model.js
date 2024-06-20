const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Role = require("./role.model.js");

const userSchema = new Schema(
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
        message: (props) =>
          `input email -> ${props.value} is not a valid email number!`,
      },
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
    role: {
      type: Schema.Types.ObjectId,
      ref: "role",
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
