import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

export const getAllUsers = async (req, res, next) => {
  try {
    console.log('req');
    const data = await UserService.getAllUsers();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All users fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (req, res, next) => {
  try {
    const { userData, created } = await UserService.newUser(req.body);
    if (created) {
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: userData,
        message: 'User registered successfully!'
      });
    }else {
      res.status(HttpStatus.CONFLICT).json({
        code: HttpStatus.CONFLICT,
        message: 'User already registered with this email..'
      })
    }
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: 'Error registering user: ' + error.message
    });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const data = await UserService.loginUser(req.body);
    res.status(HttpStatus.OK).json({
      message: 'Login Successfull',
      data: data
    });
  } catch (error) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      code: HttpStatus.UNAUTHORIZED,
      message: 'Error loging in: ' + error.message
    });
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const data = await UserService.forgotPassword(req.body);     
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data:data,
      message: 'Password reset token sent successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const data = await UserService.resetPassword(req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Password reset succesfully.'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};