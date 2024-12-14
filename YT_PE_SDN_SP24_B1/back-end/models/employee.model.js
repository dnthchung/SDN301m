import mongoose from "mongoose";
const { Schema } = mongoose;

const employeeSchema = new Schema(
  {
    name: { type: String },
    dob: { type: Date },
    gender: { type: String },
    position: { type: String },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
