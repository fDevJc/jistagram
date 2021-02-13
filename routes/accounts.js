const express = require('express');
const Account = require('../models/account');
const bcrypt = require('bcrypt');
const passport = require('passport');

const router = express.Router();

router.get('/emailsignup', (req, res, next) => {
  res.render('emailsignup', {
    title: '로그인 - jistagram',
  });
});

router.post('/emailsignup', async (req, res, next) => {
  const { email, name, nick, password } = req.body;
  try {
    const exAccount = await Account.findOne({ where: { email } });
    if (exAccount) {
    }
    const hashPassword = await bcrypt.hash(password, 12);
    await Account.create({
      email,
      name,
      nick,
      password: hashPassword,
    });
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

module.exports = router;
