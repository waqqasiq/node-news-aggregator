const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Topic = sequelize.define('topic', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensures topics are unique in the database
    },
    createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
    }
});

sequelize.define('article_topic', {
    topic_id: {
        type: DataTypes.INTEGER
    },
    article_id: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['topic_id', 'article_id'],
        },
    ],
})

Topic.associate = (models) => {
    // Many-to-many relationship between Article and Topic
    Topic.belongsToMany(models.Article, {
        through: 'article_topics', // The junction table
        foreignKey: 'topic_id',
        otherKey: 'article_id',
    });
};



module.exports = Topic;
