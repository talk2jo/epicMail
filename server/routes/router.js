import express from 'express';
import UserController from '../controllers/UserController';
import userValidator from '../middleware/ValidateUser';
import Auth from '../middleware/Auth';

const router = express.Router();

router.route('/auth/signup/')
  .post(userValidator.Signup, UserController.signUp);
router.route('/auth/signin/')
  .post(userValidator.Signin, Auth.verifyToken, UserController.signin);


export default router;