const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const roleSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Role Name is required"],
//     },
//     description: {
//       type: String,
//     },
//   },
//   { timestamps: true }
// );
// module.exports = mongoose.model("Role", roleSchema);
const Role = mongoose.model(
  "Role",
  new Schema(
    {
      name: {
        type: String,
        required: [true, "Role Name is required"],
      },
      description: {
        type: String,
      },
    },
    { timestamps: true },
  ),
);

module.exports = Role;
