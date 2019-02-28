import express from 'express';
import User from '../controllers/UserController';
import userValidator from '../middleware/ValidateUser';
import Auth from '../middleware/Auth';
import Message from '../controllers/MessageController';

const router = express.Router();

router.route('/auth/signup/')
  .post(userValidator.Signup, User.signUp);
router.route('/auth/signin/')
  .post(userValidator.Signin, Auth.verifyToken, User.signin);
router.route('/message/').post(Auth.verifyToken, Message.create);


export default router;