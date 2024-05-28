import mongoose, { Schema } from "mongoose";

const RoleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Role = mongoose.model("Role", RoleSchema);
export default Role;
