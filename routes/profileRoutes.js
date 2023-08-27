import express from 'express';
import { getProfile, updateProfile, deleteProfile } from '../controllers/profileController.js';

const profileRoutes = express.Router()

profileRoutes.get('/:userId', getProfile)
profileRoutes.put('/:userId', updateProfile)
profileRoutes.delete('/:userId', deleteProfile)

export default profileRoutes