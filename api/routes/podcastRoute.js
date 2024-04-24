import express from 'express';
import { addEpisodes, addView, createPodcast, favoritPodcast, getAllPodcast, getByCategory, getByTag, getPodcastById, mostPopular, random } from '../controllers/PodCastController.js';

const router = express.Router()
//Id is called as UserID
router.post(`/createPodcast/:id`, createPodcast)
router.post(`/createEpisode/:id`, addEpisodes)
router.get(`/`, getAllPodcast)
router.get(`/podcastById/:podcastid`, getPodcastById)
router.put(`/favourite/:id`,favoritPodcast )
router.put(`/addView/:podid`, addView)
router.get(`/random`, random)
router.get(`/mostPopular`, mostPopular)
router.get('/bytag', getByTag);
router.get('/bycategory', getByCategory);
export default router;