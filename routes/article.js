var express = require('express');
var router = express.Router();
const RSSParser = require('rss-parser');

var sequelize = require('../config/db');
const { Article } = require('../models');

const parser = new RSSParser();

async function fetchArticles(channel_url) {
    try {
        const feed = await parser.parseURL(channel_url);
        return feed.items.map(item => ({
            title: item.title,
            description: item.contentSnippet,
            pub_date: new Date(item.pubDate),
            link: item.link,
            category: item.categories.join(","),
            creator: item.creator,
            feed_channel: channel_url
        }));
    } catch (error) {
        console.error(`Error fetching feed: ${feedUrl}`, error);
        return [];
    }
}

router.get('/fetch-articles', async (req, res, next) => {
    const { channel } = req.query;
    const data = await fetchArticles(channel);

    if (data.length > 0) {
        try {
            // Prepare articles data to be inserted
            const articles = data.map(item => {
                return {
                    title: item.title,
                    link: item.link,
                    description: item.description || '',
                    pub_date: new Date(item.pub_date),
                    creator: item.creator || 'Unknown',
                    feed_channel: channel
                }
            });

            // Bulk insert articles into the database
            await Article.bulkCreate(articles, {
                ignoreDuplicates: true
            });

        } catch (error) {
            console.error('Error inserting articles: ', error);
            return next(error); // Pass error to error-handling middleware
        }
    }
    return res.json(data);
});

router.get('/get-articles', async (req, res, next) => {
    const { keyword } = req.query;

    let qry = `SELECT * FROM articles`;

    if (keyword) {
        qry = `SELECT * FROM articles WHERE description LIKE '%${keyword}%'`
    }

    try {
        const articles = await sequelize.query(qry, { type: sequelize.QueryTypes.SELECT });
        res.json(articles);
    } catch (err) {
        console.error('Error in getting articles:', err);
        next(err);
    }

});

module.exports = router;
