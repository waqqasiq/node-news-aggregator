const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// const ArticleTopic = sequelize.define('article_topics', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     topic_name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     article_id: {
//         type: DataTypes.INTEGER,
//     }
// });

const ArticleTopic = sequelize.define('article_topics', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, autoIncrement: true 
    },
    article_id: 
    { type: DataTypes.INTEGER, 
        allowNull: false 
    },
    topic_id: 
    { type: DataTypes.INTEGER,
         allowNull: false 
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

// ArticleTopic.associate = (models) => {
//     ArticleTopic.belongsTo(models.Article, {
//         foreignKey: 'article_id',
//         onDelete: 'CASCADE',
//     });
// };

ArticleTopic.associate = (models) => {
    ArticleTopic.belongsTo(Article, { as: 'article', foreignKey: 'article_id' });
    ArticleTopic.belongsTo(Topic, { as: 'topic', foreignKey: 'topic_id' });
};


module.exports = ArticleTopic;
