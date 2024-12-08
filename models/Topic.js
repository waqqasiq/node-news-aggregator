const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Topic = sequelize.define('topic', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
    }
},{
    timestamps: true
});

module.exports = Topic;