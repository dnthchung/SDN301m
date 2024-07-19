const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cakeSchema = new Schema({
  type: {
    type: String,
    // required: true
  },
  name: {
    type: String,
    // required: true
  },
  price: {
    type: Number,
    // required: true
  },
  topping: {
    type: [Schema.Types.ObjectId],
    ref: "Topping",
  },
  option: {
    type: Schema.Types.ObjectId,
    ref: "Option",
  },
});

//no version :
// const cakeSchema = new Schema({
//   type: { type: String, required: true },
//   name: { type: String, required: true },
//   price: { type: Number, required: true },
//   topping: [{ type: Schema.Types.ObjectId, ref: "Topping" }],
//   option: { type: Schema.Types.ObjectId, ref: "Option" }
// }, { versionKey: false });

const Cake = mongoose.model("Cake", cakeSchema);

module.exports = Cake;
