// Khai bao module 'mongoose'
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Tao cau truc du lieu (schema) cua doi tuong User
const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is require"],
        unique: [true, "Email must be unique value"]
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: {
            values: ["system", "google", "facebook", "zalo"],
            message: "{VALUE} is not supported"
        },
        required: true
    },
    roles: [
        {
            type: Schema.Types.ObjectId,
            ref: "role"
        }
    ]
}, {
    timestamps: true
})

// Tao ra model tu cau truc du lieu o tren
const User = mongoose.model("user", userSchema);

module.exports = User;
