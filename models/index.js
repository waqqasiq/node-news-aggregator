const sequelize = require('../config/db');
const Article = require('./Article');
const Topic = require('./Topic');

module.exports = {
  sequelize,
  Article,
  Topic
};
