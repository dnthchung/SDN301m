const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
  },
  stories: {
    type: [Schema.Types.ObjectId],
    ref: "Story", // Ensure the ref matches the name of the story model
  },
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
