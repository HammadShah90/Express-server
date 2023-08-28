import express from 'express';
import { getProfile, updateProfile, deleteProfile, followProfile, unFollowProfile } from '../controllers/profileController.js';

const profileRoutes = express.Router()

profileRoutes.get('/:id', getProfile)
profileRoutes.put('/:id', updateProfile)
profileRoutes.put('/:id/follow', followProfile)
profileRoutes.put('/:id/unfollow', unFollowProfile)
profileRoutes.delete('/:id', deleteProfile)

export default profileRoutes