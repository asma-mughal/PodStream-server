import express from 'express';
import { addEpisodes, createPodcast, favoritPodcast, getAllPodcast, getPodcastById } from '../controllers/PodCastController.js';

const router = express.Router()
//Id is called as UserID
router.post(`/createPodcast/:id`, createPodcast)
router.post(`/createEpisode/:id`, addEpisodes)
router.get(`/`, getAllPodcast)
router.get(`/podcastById/:podcastid`, getPodcastById)
router.put(`/favourite/:id`,favoritPodcast )

export default router;