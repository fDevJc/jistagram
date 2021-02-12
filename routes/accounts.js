const express = require('express');

const router = express.Router();

router.get('/emailsignup', (req, res, next) => {
  res.render('emailsignup', {
    title: '로그인 - jistagram',
  });
});

module.exports = router;
