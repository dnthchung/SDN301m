const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cakeSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^c.*$/i.test(v) && v.length <= 300;
        },
        message: (props) => `${props.value} is not a valid name! It should start with 'c' and be no longer than 300 characters.`,
      },
    },
    price: {
      type: Number,
      required: true,
    },
    topping: {
      type: [Schema.Types.ObjectId],
      ref: "Topping",
    },
    option: {
      type: Schema.Types.ObjectId,
      ref: "Option",
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [/\S+@\S+\.\S+/, "is invalid"],
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^0\d{10}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number! It should start with '0' and be 11 digits long with no spaces or special characters.`,
      },
    },
    dob: {
      type: Date,
      required: true,
    },
    username: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /s/i.test(v) && /i/i.test(v);
        },
        message: (props) => `${props.value} is not a valid username! It must contain at least one letter 's' and one letter 'i'.`,
      },
    },
  },
  { versionKey: false },
);

const Cake = mongoose.model("Cake", cakeSchema);

module.exports = Cake;
