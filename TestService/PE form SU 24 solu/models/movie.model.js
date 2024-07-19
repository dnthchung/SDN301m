const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    release: {
      type: Date,
    },
    description: {
      type: String,
    },
    producer: {
      type: Schema.Types.ObjectId,
      ref: "Producer",
    },
    director: {
      type: Schema.Types.ObjectId,
      ref: "Director",
    },
    genres: [
      {
        type: String,
      },
    ],
    stars: [
      {
        type: Schema.Types.ObjectId,
        ref: "Star",
      },
    ],
  },

  {
    timestamps: true,
  },
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
