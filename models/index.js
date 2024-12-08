const sequelize = require('../config/db');
const Article = require('./Article');
const ArticleTopic = require('./ArticleTopic');
const Topic = require('./Topic');

// Associations
Article.hasMany(ArticleTopic, { as: 'articleTopics', foreignKey: 'article_id' });
ArticleTopic.belongsTo(Article, { as: 'article', foreignKey: 'article_id' });
ArticleTopic.belongsTo(Topic, { as: 'topic', foreignKey: 'topic_id' });
Topic.hasMany(ArticleTopic, { as: 'articleTopics', foreignKey: 'topic_id' });


module.exports = {
  sequelize,
  Article,
  ArticleTopic,
  Topic
};
