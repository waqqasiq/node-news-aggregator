const { fetchArticles } = require('../services/rssService');
const { saveArticles } = require('../services/articleService');


const fetchAndSaveArticles = async (req, res, next) => {
    const { channel } = req.query;

    if (!channel) {
        return res.status(400).json({ error: 'Channel query parameter is required.' });
    }

    try {
        // Fetch articles from the RSS feed
        const articles = await fetchArticles(channel);

        if (articles.length > 0) {
            // Save articles to the database
            await saveArticles(articles);
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

module.exports = {
    fetchAndSaveArticles,
};
