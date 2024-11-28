import { Router } from 'express';
import { getUserByEmail } from '../../mongo/querys/userQuerys.js';

export const router = Router();

// utilizar passport como middleware

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (!user) {
      return res
        .status(401)
        .json({ message: 'El email no pertenece a un usuario registrado' });
    }

    const validatePassword = await comparePassword(password, user.password);

    if (!validatePassword) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // generar el token mediante jwt

    const token = '';

    return res.status(200).json({ token, message: 'login exitoso' });
  } catch (error) {
    return next(error);
  }
});

// utilizar passport como middleware

router.post('/register', (req, res, next) => {
  try {
    const data = req.body;

    const existUserEmail = getUserByEmail(data.email);

    if (existUserEmail) {
      return res
        .status(404)
        .json({ message: 'El email pertenece a un usuario registrado' });
    }

    const register = createUser(data);

    return res.status(200).json({ message: register.message });
  } catch (error) {
    next(error);
  }
});

router.get('/isLogin', (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];

    if (token) {
      // desencriptar el token, y mandar la data como el nombre de usuario en la respuesta, mediante un middleware
      // utilizando jwt se podria llamar validateToken

      return res.status(200).json({ message: 'us is Login in' });
    } else {
      return res.status(400).json({ message: 'Token not provided' });
    }
  } catch (error) {
    return next(error);
  }
});

// aca tambien se utilizaria el middleware

router.post('/logout'),
  (req, res, next) => {
    try {
      const token = req.headers['authorization']?.split(' ')[1];
      if (token) {
        return res.status(200).json({ message: 'USER SIGNED OUT' });
      } else {
        return res.status(400).json({ message: 'Token not provided' });
      }
    } catch (error) {
      return next(error);
    }
  };
