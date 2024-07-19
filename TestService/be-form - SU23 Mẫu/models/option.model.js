const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const optionSchema = new Schema({
  size: {
    type: String,
  },
  color: {
    type: String,
  },
});

const Option = mongoose.model("Option", optionSchema);
module.exports = Option;
