const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const childSchema = new mongoose.Schema({
  title: { type: String },
  date: { type: Date },
  isCompleted: { type: Boolean },
});

const jobSchema = new Schema(
  {
    name: {
      type: String,
    },
    issues: [
      {
        title: { type: String },
        date: { type: Date },
        isCompleted: { type: Boolean },
      },
    ],
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
