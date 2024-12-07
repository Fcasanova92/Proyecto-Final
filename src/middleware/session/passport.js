import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { SECRET_KEY } from '../../utils/env.js';
import { generateInvalidToken, generateToken } from '../../utils/jwt.js';
import { cookiesExtractor } from '../../utils/cookies.js';
import { AUTH_ERROR_MESSAGES } from '../../constant/authErrorMessage.js';
import {
  getDataUserByEmail,
  getDataUserById,
  updateDataUser,
  createUser,
} from '../../data/mongo/managers/userManager.js';
import { comparePassword, hashPassword } from '../../utils/byScript.js';
import { ROLE } from '../../constant/role.js';
import { uidGenerator } from '../../utils/uidGenerator.js';
import { NotAuthorized } from '../../utils/errors.js';

passport.use(
  'register',
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: 'email',
      session: false,
    },
    async (req, email, password, done) => {
      try {
        const existingUser = await getDataUserByEmail(email);
        if (existingUser) {
          const error = new NotAuthorized(
            AUTH_ERROR_MESSAGES.USER_ALREADY_EXISTS
          );
          error.field = 'email';
          error.statusCode = 401;
          return done(error);
        }

        const hashPass = await hashPassword(password);

        const uid = uidGenerator();

        const newUser = await createUser({
          uid,
          email,
          password: hashPass,
          first_name: req.body.first_name || 'Default Name',
          last_name: req.body.last_name || 'Default Surname',
          role: req.body.role || 'user',
        });

        const data = {
          uid: newUser.uid,
          role: newUser.role,
        };

        const token = generateToken(data);

        return done(null, token);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  'login',
  new LocalStrategy(
    { passReqToCallback: true, usernameField: 'email', session: false },
    async (req, email, password, done) => {
      try {
        const user = await getDataUserByEmail(email);
        if (!user) {
          const error = new NotAuthorized(AUTH_ERROR_MESSAGES.USER_NOT_FOUND);
          error.field = 'email';
          return done(error);
        }
        const passwordForm = password;
        const passwordDb = user.password;
        const verify = await comparePassword(passwordForm, passwordDb);
        if (!verify) {
          const error = new NotAuthorized(
            AUTH_ERROR_MESSAGES.PASSWORD_INCORRECT
          );
          error.statusCode = 401;
          error.field = 'password';
          return done(error);
        }
        const data = {
          uid: user.uid,
          role: user.role,
        };
        const token = generateToken(data);
        await updateDataUser(user.uid, { online: true });
        return done(null, token);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  'admin',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([cookiesExtractor]),
      secretOrKey: SECRET_KEY,
    },
    async (data, done) => {
      const { role } = data.user;
      if (ROLE.ADMIN !== role) {
        const error = new NotAuthorized(AUTH_ERROR_MESSAGES.INVALID_CREDENTIAL);
        error.statusCode = 401;
        return done(error);
      }
      return done(null, {});
    }
  )
);

passport.use(
  'current',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([cookiesExtractor]),
      secretOrKey: SECRET_KEY,
    },
    async (data, done) => {
      try {
        const { uid } = data.user;
        const { first_name, last_name, email } = await getDataUserById(uid);
        const user = { first_name, last_name, email };
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  'isOnline',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([cookiesExtractor]),
      secretOrKey: SECRET_KEY,
    },
    async (data, done) => {
      try {
        const { uid } = data.user;
        const user = await getDataUserById(uid);
        if (!user) {
          return done(null, false, { message: 'User not found' });
        }
        return done(null, { uid: null });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  'signout',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([cookiesExtractor]),
      secretOrKey: SECRET_KEY,
    },
    async (data, done) => {
      try {
        const { uid } = data.user;
        await updateDataUser(uid, { online: false });
        const token = generateInvalidToken('');
        data.token = token;
        return done(null, { uid: null });
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
