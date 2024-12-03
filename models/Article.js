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
        type: DataTypes.TEXT
    },
    pubDate:
    {
        type: DataTypes.DATE,
        field: 'pub_date'
    },
    link:
    {
        type: DataTypes.STRING
    },
    creator:
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

module.exports = Article;
