import mongoose from "mongoose";

const PodcastsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        default: "",
        maxlength: 10000000000000
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userPodStream",
        required: true,
    },
    tags: {
        type: [String],
        default: [],
    },
    type: {
        type: String,
        default: "audio",
    },
    category: {
        type: String,
        default: "podcastvalue",
    },
    views: {
        type: Number,
        default: 0,
    },
    episodes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Episodes",
        default: [],
    }
},
    {
        timestamps: true,
    }
);

export default mongoose.model("Podcasts", PodcastsSchema);