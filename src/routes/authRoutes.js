import express from 'express';
import { registerUser } from '../controllers/authController.js';
import router from './healtCheckRoutes';

const Router = express.Router();

router.route('/register').post(registerUser);

router.route('/login').post(registerUser);