//khai bao mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//khai bao schema
const roleSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
  },
  { timestamps: true }
);

const Role = mongoose.model("role", roleSchema);
module.exports = Role;
