const rssService = require('../services/rssService');
const articleService = require('../services/articleService');


const fetchAndSaveArticles = async (req, res, next) => {
    const { channel_url } = req.query;

    if (!channel_url) {
        return res.status(400).json({ error: 'Channel query parameter is required.' });
    }

    try {
        // Fetch articles from the RSS feed
        const articles = await rssService.fetchArticles(channel_url);

        if (articles.length > 0) {
            // Save articles to the database
            await articleService.saveArticles(articles);
            console.log('Articles saved successfully.');
        } else {
            console.log('No new articles to save.');
        }

        res.status(200).json({
            message: 'Articles fetched and processed.',
            articles,
        });
    } catch (error) {
        console.error('Error processing articles:', error);
        next(error); // Pass error to Express error handler
    }
};

const getFilteredArticles = async (req, res, next) => {
    try {
        const { keyword, start_date, end_date } = req.query;

        // Fetch articles from the service
        const articles = await articleService.fetchFilteredArticles({ keyword, start_date, end_date });

        res.json(articles);
    } catch (error) {
        console.error('Error fetching articles:', error);
        next(error); // Pass the error to Express error-handling middleware
    }
};

module.exports = {
    fetchAndSaveArticles,
    getFilteredArticles
};
