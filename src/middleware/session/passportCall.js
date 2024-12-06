import passport from 'passport';

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return next(info);
      }

      req.user = user;
      next();
    })(req, res, next);
  };
};
