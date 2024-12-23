import { AUTH_MESSAGES } from '../constant/authMessage.js';

class SessionController {
  login = async (req, res, next) => {
    try {
      const token = req.user;
      return res
        .cookie('token', token, {
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: true,
          secure: false,
        })
        .status(200)
        .json({ data: token, message: AUTH_MESSAGES.LOGIN_SUCCESS }); // no se deberia de enviar el token al front
    } catch (error) {
      return next(error);
    }
  };

  // envie una cookie con el token, porque el usuario cuando se registra, directamente se logea
  register = (req, res, next) => {
    try {
      return res
        .status(200)
        .json({ data: null, message: AUTH_MESSAGES.REGISTER_SUCCESS }); // no se deberia de enviar el token al front
    } catch (error) {
      next(error);
    }
  };

  current = async (req, res, next) => {
    try {
      const data = req.user;
      return res.status(200).json({ data, message: null });
    } catch (error) {
      return next(error);
    }
  };

  isOnline = (req, res, next) => {
    try {
      return res
        .status(200)
        .json({ data: null, message: AUTH_MESSAGES.ONLINE_SUCCESS });
    } catch (error) {
      return next(error);
    }
  };

  logout = (req, res, next) => {
    try {
      return res
        .clearCookie('token')
        .status(200)
        .json({ data: null, message: AUTH_MESSAGES.SIGNOUT_SUCCESS });
    } catch (error) {
      return next(error);
    }
  };

  admin = (req, res, next) => {
    try {
      return res
        .status(200)
        .json({ data: null, message: AUTH_MESSAGES.ADMIN_SUCCESS });
    } catch (error) {
      return next(error);
    }
  };

  recoveryPassowrd = (req, res, next) => {
    try {
      return res
        .status(200)
        .json({ data: null, message: AUTH_MESSAGES.PASSWORD_UPDATE });
    } catch (error) {
      return next(error);
    }
  };

  verifyRegister = (req, res, next) => {
    try {
      return res
        .status(200)
        .json({ data: null, message: AUTH_MESSAGES.VERIFY_REGISTER });
    } catch (error) {
      return next(error);
    }
  };

  newCodeVerify = (req, res, next) => {
    try {
      return res
        .status(200)
        .json({ data: null, message: AUTH_MESSAGES.VERIFY_NEW_CODE });
    } catch (error) {
      return next(error);
    }
  };
}
const controller = new SessionController();
export const {
  login,
  register,
  logout,
  isOnline,
  current,
  admin,
  recoveryPassowrd,
  verifyRegister,
  newCodeVerify,
} = controller;
