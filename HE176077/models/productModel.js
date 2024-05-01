const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const sanpham = new Schema({
  id: { type: ObjectId },
  name: {
    type: String,
    required: true,
  }, //giống trong mongodb
  price: { type: Number }, //giống trong mongodb
});

module.exports = mongoose.model.product || mongoose.model("product", sanpham);
