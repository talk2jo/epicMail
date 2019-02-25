import express from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();

router.route('/auth/signup/').post(UserController.signUp);

export default router;