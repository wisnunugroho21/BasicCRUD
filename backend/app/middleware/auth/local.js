import passport from 'passport';
import {Strategy} from 'passport-local';
import flash from 'connect-flash';
import model from '../../models';

const {User} = model;

export default (app) => {
  passport.use(new Strategy(
      async (username, password, done) => {
        try {
          const user = await User.findOne({
            where: {
              username,
              password,
            },
          });

          if (user) {
            return done(null, user);
          } else {
            return done(null, false, {message: 'Wrong username or password'});
          }
        } catch (err) {
          return done(err);
        }
      },
  ));

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  });

  return passport.authenticate('local', {
    failureRedirect: '/login',
  });
};
