import { Router } from 'express';

import { AUTH_MESSAGES } from '../../constant/authMessage.js';
import { passportCall } from '../../middleware/session/passportCall.js';

export const router = Router();

// utilizar passport como middleware

router.post('/login', passportCall('login'), async (req, res, next) => {
  try {
    const token = req.user;
    return res
      .cookie('token', token, {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: false,
      })
      .status(200)
      .json({ token, message: AUTH_MESSAGES.LOGIN_SUCCESS });
  } catch (error) {
    return next(error);
  }
});

// utilizar passportCall como middleware

router.post('/register', passportCall('register'), (req, res, next) => {
  try {
    const data = req.user;
    return res
      .status(200)
      .json({ data: data, message: AUTH_MESSAGES.REGISTER_SUCCESS });
  } catch (error) {
    next(error);
  }
});

router.get('/current', passportCall('current'), async (req, res, next) => {
  try {
    const data = req.user;
    return res.status(200).json({ data });
  } catch (error) {
    return next(error);
  }
});

router.get('/online', passportCall('isOnline'), (req, res, next) => {
  try {
    return res.status(200).json({ message: AUTH_MESSAGES.ONLINE_SUCCESS });
  } catch (error) {
    return next(error);
  }
});

// aca tambien se utilizaria el middleware

router.post('/logout', passportCall('signout'), (req, res, next) => {
  try {
    return res
      .clearCookie('token')
      .status(200)
      .json({ message: AUTH_MESSAGES.SIGNOUT_SUCCESS });
  } catch (error) {
    return next(error);
  }
});

router.get('/admin', passportCall('admin'), (req, res, next) => {
  try {
    return res.status(200).json({ message: AUTH_MESSAGES.ADMIN_SUCCESS });
  } catch (error) {
    return next(error);
  }
});
