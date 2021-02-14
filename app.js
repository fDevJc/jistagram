const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
const nunjucks = require('nunjucks');
const passport = require('passport');

const pageRouter = require('./routes/page');
const accountRouter = require('./routes/accounts');
const postRouter = require('./routes/post');
const commentRouter = require('./routes/comment');

const { sequelize } = require('./models');
const passportConfig = require('./passport');

dotenv.config();

const app = express();
passportConfig();
app.set('port', process.env.PORT || 8080);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});
sequelize
  .sync({ force: false })
  .then(() => console.log('database connect sueccess'))
  .catch((err) => console.error(`database connect err : ${err}`));

//
app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: 'session-cookie',
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', pageRouter);
app.use('/accounts', accountRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);

app.use((req, res, next) => {
  const err = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  console.error(err);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log('>>>>>>>app/err : ', err);
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'prodcution' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(`port: ${app.get('port')}, server running........`);
});
