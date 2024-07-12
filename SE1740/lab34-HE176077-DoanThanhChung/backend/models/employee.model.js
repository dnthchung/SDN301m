const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
    },
    position: {
      type: String,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Employee", employeeSchema);
