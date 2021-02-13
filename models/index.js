'use strict';

const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const env = process.env.NODE_ENV;
const config = require('../config/config')[env];
const Account = require('./account');

const db = [];
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Account = Account;

Account.init(sequelize);

Account.associate(db);

module.exports = db;
