"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const common_constant_1 = require("~/api/v1/constants/common.constant");
const messages_constant_1 = require("~/api/v1/constants/messages.constant");
exports.userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, messages_constant_1.UserMessage.EMAIL_IS_REQUIRED],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, messages_constant_1.UserMessage.EMAIL_IS_INVALID],
    },
    fullName: { type: String, required: [true, messages_constant_1.UserMessage.FULL_NAME_IS_REQUIRED] },
    phoneNumber: { type: String, trim: true, match: [/^[0-9+\-\s()]+$/, messages_constant_1.UserMessage.PHONE_NUMBER_INVALID] },
    dateOfBirth: {
        type: Date,
        validate: {
            validator: function (date) {
                return date < new Date();
            },
            message: messages_constant_1.UserMessage.DATE_OF_BIRTH_INVALID,
        },
    },
    avatar: { type: String },
    gender: {
        type: String,
        enum: {
            values: [common_constant_1.GenderObject.male, common_constant_1.GenderObject.female, common_constant_1.GenderObject.other],
        },
        default: common_constant_1.GenderObject.other,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
