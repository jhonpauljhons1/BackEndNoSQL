import express from 'express';
import { authenticateUser, registerUser } from '../controllers/authController.js';
import router from './healtCheckRoutes';

const Router = express.Router();

router.post('/register', registerUser);


router.post('/login', authenticateUser);

export default router;