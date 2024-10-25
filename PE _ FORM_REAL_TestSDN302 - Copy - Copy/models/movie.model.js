const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//khai báo cho enum
const validGenres = ["Action", "Drama", "Comedy", "Cartoon"];

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
        //validate object nhận 2 tham số: 1 là giá trị cần validate, 2 là function trả về true hoặc false
        validate: {
          validator: function (v) {
            return validGenres.includes(v);
          },
          message: (props) => `${props.value} is not supported`,
        },
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
