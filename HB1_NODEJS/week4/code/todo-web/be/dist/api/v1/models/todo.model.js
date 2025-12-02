"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosDatabase = exports.todoSchema = void 0;
const mongoose_1 = require("mongoose");
const messages_constant_1 = require("~/api/v1/constants/messages.constant");
exports.todoSchema = new mongoose_1.Schema({
    title: { type: String, required: [true, messages_constant_1.TodoMessage.TITLE_IS_REQUIRED], trim: true, index: true, maxlength: [200, messages_constant_1.TodoMessage.TITLE_LENGTH_MUST_BE_FROM_3_TO_50] },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: [true, messages_constant_1.UserMessage.USER_ID_IS_REQUIRED] },
}, {
    collection: "Todo",
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: { virtuals: true },
});
exports.todosDatabase = [];
