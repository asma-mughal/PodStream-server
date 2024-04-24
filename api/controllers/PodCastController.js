import Episodes from "../models/Episodes.js";
import Podstream from "../models/Podstream.js";
import { User } from "../models/User.js";

export const createPodcast = async (req, res) => {
  try {
      const user = await User?.findById({ _id: req.params.id });
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    let episodeList = [];
    await Promise.all(
      req.body.episodes.map(async (item) => {
        const episode = new Episodes({
          creator: user._id,
          ...item,
        });
        const savedEpisode = await episode.save();
        episodeList.push(savedEpisode?._id);
      })
    );
    const podcast = new Podstream({
      creator: user.id,
      episodes: episodeList,
      name: req.body.name,
      desc: req.body.desc,
      thumbnail: req.body.thumbnail,
      tags: req.body.tags,
      type: req.body.type,
      category: req.body.category,
    });
    const savedPodcast = await podcast.save();
    await User.findByIdAndUpdate(
      user?._id,
      {
        $push: { podcasts: savedPodcast.id },
      },
      { new: true }
    );

    res.status(201).json(savedPodcast);
  } catch (error) {
    console.error("Error creating Podcast", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};
export const addEpisodes = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    await Promise.all(
      req.body.episodes.map(async (item) => {
        const episode = new Episodes({ creator: user.id, ...item });
        const savedEpisode = await episode.save();
        await Podstream.findByIdAndUpdate(
          req.body.podid,
          {
            $push: { episodes: savedEpisode.id },
          },
          { new: true }
        );
      })
    );

    res.status(201).json({ message: "Episode added successfully" });
  } catch (error) {
    console.error("Error creating Podcast", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};
export const getAllPodcast = async (req, res) => {
  try {
    const podcasts = await Podstream.find()
      .populate("creator", "name img")
      .populate("episodes");
    res.json(podcasts);
  } catch (error) {
    console.error("Error fetching all podcasts:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
export const getPodcastById = async (req, res, next) => {
  try {
    const podcast = await Podstream.findById({_id : req.params.podcastid})
      .populate("creator", "name img")
      .populate("episodes");
    return res.status(200).json(podcast);
  } catch (err) {
      console.log(err)
  }
};
export const favoritPodcast = async(req, res) => {
    try {
        const user = await User.findById({ _id: req.params.id })
        const podcast = await Podstream.findById({ _id: req.body.podid })
        if (user.id === podcast.creator) {
            return res.status(400).json({message : "You can't favourite your own Podcast"})
        }
        let found = false;
        await Promise.all(user?.favorits?.map(async (item) => {
            if (req.body.podid === item) {
                found = true;
                await User.findByIdAndUpdate(user?._id, {
                    $pull: { favorits: req.body.podid },
                }, {new : true})
            }
        }))
        if (!found) {
            const favouriteId = await User.findByIdAndUpdate(user.id, {
                $push : { favorits: req.body.podid },
            }, { new: true })
            
            res.status(200).json({ message: "Added to favorit" });
        }
    } catch (error) {
      
    console.error("Error favourite the podcasts:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });  
    }
}