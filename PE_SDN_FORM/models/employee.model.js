const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const validGender = ["male", "female", "other"];

const employeeSchema = new Schema(
  {
    name: {
      firstName: { type: String },
      lastName: { type: String },
      middleName: { type: String },
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      //validate object nhận 2 tham số: 1 là giá trị cần validate, 2 là function trả về true hoặc false
      validate: {
        validator: function (v) {
          return validGender.includes(v);
        },
        message: (props) => `${props.value} is not supported`,
      },
    },
    manager: { type: String },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
    },
    account: {
      email: { type: String },
      password: { type: String },
    },
    dependents: [
      {
        fullname: { type: String },
        relation: { type: String },
      },
    ],
    jobs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
