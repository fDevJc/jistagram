const express = require('express');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const Post = require('../models/post');

const router = express.Router();

//업로드 디렉토리가 없는경우 생성
try {
  fs.readdirSync('uploads');
} catch (err) {
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { filesize: 5 * 1024 * 1024 },
});

router.post('/img', upload.single('img'), (req, res) => {
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` });
});
const upload2 = multer();
router.post('/', upload2.none(), async (req, res, next) => {
  try {
    await Post.create({
      content: req.body.content,
      img: req.body.url,
      UserId: req.user.id,
    });

    res.redirect('/');
  } catch (err) {
    console.log('post router / err : ', err);
  }
});

module.exports = router;
