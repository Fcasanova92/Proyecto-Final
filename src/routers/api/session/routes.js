import { Router } from 'express';

import {
  login,
  register,
  current,
  isOnline,
  logout,
  admin,
  recoveryPassowrd,
  verifyRegister,
  newCodeVerify,
} from '../../../controllers/session.controller.js';

import { passportCall } from '../../../middleware/session/passportCall.js';

export const router = Router();

// utilizar passport como middleware

router.post('/login', passportCall('login'), login);

// utilizar passportCall como middleware

router.post('/register', passportCall('register'), register);

router.get('/current', passportCall('current'), current);

router.get('/online', passportCall('isOnline'), isOnline);

// aca tambien se utilizaria el middleware

router.post('/logout', passportCall('signout'), logout);

router.get('/admin', passportCall('admin'), admin);

router.post(
  '/recovery-password',
  passportCall('recovery-password'),
  recoveryPassowrd
);

router.post('/verify-register', passportCall('verify'), verifyRegister);
router.post('/new-code-verify', passportCall('new-code-verify'), newCodeVerify);
