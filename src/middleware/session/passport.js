import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } = process.env;

passport.use(
  'register',
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: 'email',
      passwordField: 'password',
    },
    async (req, email, password, done) => {
      try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
          const error = new Error('USER ALREADY EXISTS');
          error.statusCode = 401;
          return done(error);
        }

        const hashedPassword = createHashUtil(password);

        const newUser = await createUser({
          email,
          password: hashedPassword,
          name: req.body.name || 'Default Name',
          surname: req.body.surname,
          role: req.body.role || 'USER',
        });

        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  'login',
  new LocalStrategy(
    { passReqToCallback: true, usernameField: 'email' },
    async (req, email, password, done) => {
      try {
        const user = await readByEmail(email);
        if (!user) {
          const error = new Error('USER NOT FOUND');
          error.statusCode = 401;
          return done(error);
        }
        const passwordForm = password; /* req.body.password */
        const passwordDb = user.password;
        const verify = verifyHashUtil(passwordForm, passwordDb);
        if (!verify) {
          const error = new Error('INVALID CREDENTIALS');
          error.statusCode = 401;
          return done(error);
        }
        const data = {
          user_id: user._id,
          role: user.role,
        };
        const token = createTokenUtil(data);
        req.token = token;
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
/**
 * @admin
 * Similar a "login", pero adicionalmente verifica si el usuario tiene un rol administrativo.
 * Rechaza usuarios que no tienen permisos de administrador.
 */
passport.use(
  'admin',
  new LocalStrategy(
    {
      /* OBJETO DE CONFIGURACION */
    },
    async () => {
      /* CB CON LA LOGICA DE LA ESTRATEGIA */
    }
  )
);
/**
 * @online
 * Valida al usuario mediante credenciales locales.
 * Puede servir para controlar el estado en tiempo real de usuarios conectados a la aplicación.
 */
passport.use(
  'online',
  new LocalStrategy(
    {
      /* OBJETO DE CONFIGURACION */
      passReqToCallback: true,
      usernameField: 'email', // Campo que se usará como nombre de usuario
      passwordField: 'password', // Campo que se usará para la contraseña
    },
    async (req, email, password, done) => {
      /* CB CON LA LOGICA DE LA ESTRATEGIA */
      try {
        // Validar el token
        const token = req.token;
        const { user_id } = verifyTokenUtil(token);
        // buscar si el usuario está online
        const user = await readById(user_id);
        const { isOnline } = user;
        if (!isOnline) {
          const error = new Error('USER IS NOT ONLINE');
          error.statusCode = 401;
          return done(error);
        }
        return done(null, user);
      } catch (error) {
        return done(null, user);
      }
    }
  )
);
/**
 * @signout
 * Invalida tokens o sesiones activas.
 * Retorna un estado indicando que la operación fue exitosa.
 */
passport.use(
  'signout',
  new LocalStrategy(
    {
      /* OBJETO DE CONFIGURACION */
    },
    async () => {
      /* CB CON LA LOGICA DE LA ESTRATEGIA */
    }
  )
);
passport.use(
  'google',
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      passReqToCallback: true,
      callbackURL: BASE_URL + 'sessions/google/cb',
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const { id, picture } = profile;
        let user = await readByEmail(id);
        if (!user) {
          user = await create({
            email: id,
            photo: picture,
            password: createHashUtil(id),
          });
        }
        req.token = createTokenUtil({ role: user.role, user: user._id });
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
