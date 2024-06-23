const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
        message: (props) => `input email -> ${props.value} is not a valid email number!`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    role: { type: Schema.Types.ObjectId, ref: "Role" },
  },

  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
