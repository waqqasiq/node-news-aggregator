const rssService = require('../services/rssService');
const articleService = require('../services/articleService');
const topicService = require('../services/topicService');
const { Article } = require('../models');

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
        const { keyword, start_date, end_date, page, limit } = req.query;

        // Fetch articles from the service
        const articles = await articleService.fetchFilteredArticles({ keyword, start_date, end_date, page, limit });

        res.json(articles);
    } catch (error) {
        console.error('Error fetching articles:', error);
        next(error); // Pass the error to Express error-handling middleware
    }
};

const getArticleById = async (req, res, next) => {
    const { id } = req.params;
    try {
        // Fetch the article along with associated topics
        const article = await articleService.getArticleByIdWithTopics(id);
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.json(article);
    } catch (error) {
        console.error('Error in getArticleById:', error);
        res.status(500).json({ error: 'Error fetching article' });
    }
};

const getTopics =  async (req, res, next) => {
    try {
        // Fetch all article descriptions from the database
        const articles = await Article.findAll({
            attributes: ['description'], // Fetch only the 'description' column
        });

        // Extract descriptions into an array
        const descriptions = articles.map((article) => article.description);

        // Use `compromise` to extract topics
        const topics = topicService.extractTopics(descriptions);

        res.json({ topics });
    } catch (error) {
        console.error('Error fetching topics:', error);
        res.status(500).json({ message: 'Failed to extract topics' });
    }
}

module.exports = {
    fetchAndSaveArticles,
    getFilteredArticles,
    getArticleById,
    getTopics
};
