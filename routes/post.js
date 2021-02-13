const express = require('express');
const fs = require('fs');
const multer = require('multer');

const Post = require('../models/post');

const router = express.Router();

//업로드 디렉토리가 없는경우 생성
try {
  fs.readFileSync('uploads');
} catch (err) {
  fs.mkdirSync('uploads');
}

router.post('/', async (req, res, next) => {
  try {
    await Post.create({
      content: req.body.content,
      img: req.body.img,
    });
  } catch (err) {}
});
