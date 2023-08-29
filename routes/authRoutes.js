import express from 'express';
import {
    login,
    registration
} from '../controllers/authController.js';

const authRoutes = express.Router()

authRoutes.post('/register', registration)
authRoutes.post('/login', login)

export default authRoutes