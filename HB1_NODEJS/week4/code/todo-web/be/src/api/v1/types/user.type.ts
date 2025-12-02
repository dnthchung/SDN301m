import mongoose, { Document } from "mongoose";
import { Gender } from "~/api/v1/types/comon.types";

export interface IUser extends Document {
  // Info Basic
  _id: mongoose.Types.ObjectId;
  email: string;
  fullName: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  avatar?: string;
  gender: Gender;

  // Address
  // address: IAddress[];

  // methods
  getFullName(): string;
  isActive(): boolean;
}
