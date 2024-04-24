import mongooose from 'mongoose'
import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required:true
    },
    podcasts: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Podcasts",
        default: [],
    },
    favorits: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Podcasts",
        default: [],
    }
},{timestamps:true}
)
export const User = mongoose.model('userPodStream', userSchema);
