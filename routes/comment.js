const express = require('express');

const Comment = require('../models/comment');

const router = express.Router();

router.get('/:postId', (req, res, netx) => {});

router.post('/', async (req, res, next) => {
  try {
    await Comment.create({
      content: req.body.content,
      PostId: req.body.postId,
      nick: req.body.nick,
    });
    res.redirect('/');
  } catch (err) {
    console.error('comment router post / err : ', err);
  }
});

module.exports = router;
