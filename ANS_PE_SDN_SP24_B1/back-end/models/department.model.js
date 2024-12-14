import mongoose from "mongoose";
const { Schema } = mongoose;

const departmentSchema = new Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

const Department = mongoose.model("Department", departmentSchema);

export default Department;
