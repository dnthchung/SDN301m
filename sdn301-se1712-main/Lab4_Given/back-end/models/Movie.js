import mongoose, {Schema} from "mongoose";

const MovieSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    year: {
        type: Number
    },
    genre: {
        type: Schema.Types.ObjectId,
        ref: 'genres'
    }
})

const Movie = mongoose.model("movies", MovieSchema)

export default Movie