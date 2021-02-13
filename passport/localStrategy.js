const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Account = require('../models/account');
const bcrypt = require('bcrypt');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const exUser = await Account.findOne({ where: { email } });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              done(null, exUser);
            } else {
              done(null, false, { message: '패스워드가 일치하지 않습니다. ' });
            }
          } else {
            done(null, false, { message: '아이디가 일치하지 않습니다. ' });
          }
        } catch (err) {
          console.error('localStrategy error err : ', err);
          done(err);
        }
      }
    )
  );
};
