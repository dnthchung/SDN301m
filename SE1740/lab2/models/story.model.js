const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storySchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  fans: {
    type: [Schema.Types.ObjectId],
    ref: "Person",
  },
});

const Story = mongoose.model("Story", storySchema);

module.exports = Story;
