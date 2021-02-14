const express = require('express');

const { isLoggedIn, isNotLoggedIn } = require('../routes/middlewares');
const { Post, Account, Comment } = require('../models');

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
        include: {
          model: Comment,
          attributes: ['nick', 'content'],
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
    posts: posts,
  });
});

module.exports = router;
