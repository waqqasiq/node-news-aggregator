const { Article } = require('../models');
const { Op } = require('sequelize');

async function saveArticles(articles) {
    if (!Array.isArray(articles) || articles.length === 0) {
        console.log('No articles to save.');
        return;
    }

    try {
        // Use Sequelize's bulkCreate with ignoreDuplicates option
        await Article.bulkCreate(articles, {
            ignoreDuplicates: true, // Ensures duplicate articles (based on unique key constraints) are ignored
        });

        console.log(`${articles.length} articles processed for saving.`);
    } catch (error) {
        console.error('Error saving articles:', error);
        throw error; // Propagate the error to the caller
    }
}

const fetchFilteredArticles = async ({ keyword, start_date, end_date }) => {
    const where = {};

    // Apply filters if provided
    if (keyword) where.description = { [Op.like]: `%${keyword}%` };
    if (start_date) where.pub_date = { [Op.gte]: new Date(start_date) };
    if (end_date) where.pub_date = { [Op.lte]: new Date(end_date) };

    // Query the database
    return await Article.findAll({ where });
};


module.exports = {
    saveArticles,
    fetchFilteredArticles
};
