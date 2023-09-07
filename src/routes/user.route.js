import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator, loginUserValidator, forgetPasswordValidator, resetPasswordValidator } from '../validators/user.validator';
import {resetPasswordAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all users
router.get('', userController.getAllUsers);

//route to create a new user
router.post('', newUserValidator, userController.registerUser);

//route to login a registered user
router.post('/login', loginUserValidator, userController.loginUser);

//route for forget password
router.put('/forgetPassword', forgetPasswordValidator, userController.forgotPassword);

//route for reset password
router.put('/resetPassword', resetPasswordValidator, resetPasswordAuth, userController.resetPassword);


export default router;
