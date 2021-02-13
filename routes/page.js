const express = require('express');

const { isLoggedIn, isNotLoggedIn } = require('../routes/middlewares');

const router = express.Router();

router.get('/', (req, res, next) => {
  let page = 'login';
  if (req.isAuthenticated()) {
    page = 'main';
  }
  res.render(page, {
    title: 'jistagram',
  });
});

module.exports = router;
