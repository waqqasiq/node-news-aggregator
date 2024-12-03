const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Article = sequelize.define('article', {
    title:
    {
        type: DataTypes.STRING,
        allowNull: false
    },
    description:
    {
        type: DataTypes.TEXT,
        allowNull: false
    },
    pub_date:
    {
        type: DataTypes.DATE,
        allowNull: false
    },
    link:
    {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    creator:
    {
        type: DataTypes.STRING
    },
    feed_channel:
    {
        type: DataTypes.STRING
    },
    topics:
    {
        type: DataTypes.STRING
    },
    createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
    }
}, {
    timestamps: true
});

Article.associate = (models) => {
    // Many-to-many relationship between Article and Topic
    Article.belongsToMany(models.Topic, {
        through: 'article_topics', // The junction table
        foreignKey: 'topic_id',
        otherKey: 'article_id',
    });
};

module.exports = Article;
