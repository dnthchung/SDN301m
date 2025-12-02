import { Schema, model } from "mongoose";
import { GenderObject } from "~/api/v1/constants/common.constant";
import { UserMessage } from "~/api/v1/constants/messages.constant";
import { IUser } from "~/api/v1/types/user.type";

export const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, UserMessage.EMAIL_IS_REQUIRED],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, UserMessage.EMAIL_IS_INVALID],
    },
    fullName: { type: String, required: false },
    phoneNumber: { type: String, trim: true, match: [/^[0-9+\-\s()]+$/, UserMessage.PHONE_NUMBER_INVALID] },
    dateOfBirth: {
      type: Date,
      validate: {
        validator: function (date: Date) {
          return date < new Date();
        },
        message: UserMessage.DATE_OF_BIRTH_INVALID,
      },
    },
    avatar: { type: String },
    gender: {
      type: String,
      enum: {
        values: [GenderObject.male, GenderObject.female, GenderObject.other],
      },
      default: GenderObject.other,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export const User = model<IUser>("User", userSchema);
