import mongoose, {Schema} from "mongoose"

const GenreSchema = new Schema({
    name: {
        type: String,
        unique: true
    }
})

const Genre = mongoose.model('genres', GenreSchema)

export default Genre