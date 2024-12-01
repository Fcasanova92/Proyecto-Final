import jwt from 'jsonwebtoken';
import { SECRET_KEY } from './env.js';

export const generateToken = (user) => {
  try {
    const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: '24h' });

    return token;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

export const generateInvalidToken = (user) => {
  try {
    const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: '1s' });

    return token;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

export const decodeToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    return decoded;
  } catch (error) {
    if (
      error.name === 'TokenExpiredError' ||
      error.name === 'JsonWebTokenError' ||
      error.name === 'NotBeforeError'
    ) {
      throw new NotFound(error.message);
    }

    throw new InternalServerError(error.message);
  }
};
