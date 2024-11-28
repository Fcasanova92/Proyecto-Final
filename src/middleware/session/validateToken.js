import { decodeToken } from '../../utils/jwt';

export const validateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    req.user = result;

    next();
  } catch (error) {
    next(error);
  }
};
