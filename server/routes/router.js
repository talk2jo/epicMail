import express from 'express';
import UserController from '../controllers/UserController';
import userValidator from '../middleware/ValidateUser';

const router = express.Router();

router.route('/auth/signup/').post(userValidator.Signup, UserController.signUp);

export default router;