const express = require('express');

const { isLoggedIn, isNotLoggedIn } = require('../routes/middlewares');
const { Post, Account } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
  let page = 'login';
  let posts = '';
  if (req.isAuthenticated()) {
    try {
      page = 'main';
      posts = await Post.findAll({
        include: {
          model: Account,
          attributes: ['id', 'nick'],
        },
        order: [['createdAt', 'DESC']],
      });
    } catch (err) {
      console.err('>>>>>>err : ', err);
    }
  }
  console.log('>>>>>>>>>>>', posts);
  res.render(page, {
    title: 'jistagram',
    twits: posts,
  });
});

module.exports = router;
