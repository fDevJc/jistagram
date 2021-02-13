'use strict';

const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const env = process.env.NODE_ENV;
const config = require('../config/config')[env];
const Account = require('./account');
const Post = require('./post');

const db = [];
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Account = Account;
db.Post = Post;

Account.init(sequelize);
Post.init(sequelize);

Account.associate(db);
Post.associate(db);

module.exports = db;
