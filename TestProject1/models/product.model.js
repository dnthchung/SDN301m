const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  product_detail: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity_available: {
    type: Number,
    required: true,
    min: 0,
  },
  color: {
    type: [String],
  },
  rate: {
    type: Number,
    min: 0,
    max: 5,
  },
  vote_count: {
    type: Number,
    default: 0,
  },
});

module.exports =
  mongoose.model.product || mongoose.model("product", productSchema);
// Path: TestProject1/models/category.model.js
