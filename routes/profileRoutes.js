import express from 'express';
import { getProfile, updateProfile } from '../controllers/profileController.js';

const profileRoutes = express.Router()

profileRoutes.get('/:userId', getProfile)
profileRoutes.put('/:userId', updateProfile) 

export default profileRoutes