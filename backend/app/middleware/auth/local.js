import {compareSync, genSaltSync, hashSync} from 'bcrypt-nodejs';
import {Strategy} from 'passport-local';
import model from '../../models';

const {User} = model;

export default (passport) => {
  passport.use('local-signup', new Strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  },
  async (req, username, password, done) => {
    try {
      const user = await User.findOne({
        where: {
          username,
        },
      });

      if (user) {
        return done(null, false, {
          message: 'That username is already taken',
        });
      } else {
        const userPassword = hashSync(
            password,
            genSaltSync(8),
            null);

        const newUser = await User.create({
          username,
          password: userPassword,
        });

        if (newUser) {
          return done(null, newUser);
        } else {
          return done(null, false);
        }
      }
    } catch (err) {
      return done(err);
    }
  }));

  passport.use('local-signin', new Strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  },
  async (req, username, password, done) => {
    try {
      const user = await User.findOne({
        where: {
          username,
        },
      });

      if (!user) {
        return done(null, false, {
          message: 'Username or Password is wrong',
        });
      }

      if (!compareSync(password, user.password)) {
        return done(null, false, {
          message: 'Username or Password is wrong',
        });
      }

      return done(null, user);
    } catch (err) {
      done(err);
    }
  }));

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

  return passport;
};
