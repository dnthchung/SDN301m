const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//object id được dùng để tạo id tự động
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
