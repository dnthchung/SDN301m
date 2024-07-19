const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const producerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Producer = mongoose.model("Producer", producerSchema);

module.exports = Producer;
