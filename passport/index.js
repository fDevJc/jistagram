const poassport = require('passport');
const local = require('./localStrategy');

const Account = require('../models/account');
const passport = require('passport');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    Account.findOne({ where: { id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
  local();
};
