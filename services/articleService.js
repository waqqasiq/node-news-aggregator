const { Article } = require('../models');

/**
 * Save articles to the database.
 * Ignores duplicates based on the `link` column.
 *
 * @param {Array} articles - Array of articles to save. Each article should have:
 *   - title
 *   - link
 *   - description
 *   - pub_date
 *   - creator
 *   - feed_channel
 * @returns {Promise<void>} - Resolves when all articles are saved.
 */
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

module.exports = {
    saveArticles,
};
