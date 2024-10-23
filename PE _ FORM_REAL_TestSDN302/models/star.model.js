const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const starSchema = new Schema(
  {
    fullname: {
      type: String,
    },
    male: {
      type: Boolean,
    },
    dob: {
      type: Date,
    },
    nationality: {
      type: String,
    },
  },

  {
    timestamps: true,
  },
);

const Star = mongoose.model("Star", starSchema);

module.exports = Star;
