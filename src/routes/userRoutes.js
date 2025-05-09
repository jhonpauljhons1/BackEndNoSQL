import express from 'express';
import {getAllUsers,createUser} from '../controllers/userController.js';
import {getAllPosts, createPost} from '../controllers/postController.js';

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);
router.route('/posts').get(getAllPosts).post(createPost);

export default router;