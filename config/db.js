require('dotenv').config();
var Sequelize = require('sequelize');

// local: root, mysql
// prod: waqqasiqbal, Waqqas123!@#
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    pool: {
        idle: 300000,
        acquire: 800000
    }
});

module.exports = sequelize;