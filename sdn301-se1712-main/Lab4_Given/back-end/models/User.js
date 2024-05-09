import mongoose, {Schema} from "mongoose";

const UserSchema = new Schema({
    email:{
        type: String,
        required: [true, "Email is not blank"],
        lowercase: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
});

const User = mongoose.model('users', UserSchema);

export default User;