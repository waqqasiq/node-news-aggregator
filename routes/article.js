var express = require('express');
var router = express.Router();
const RSSParser = require('rss-parser');

var sequelize = require('../config/db');

const parser = new RSSParser();

async function fetchArticles(feedUrl) {
  try {
    const feed = await parser.parseURL(feedUrl);
    return feed.items.map(item => ({
      title: item.title,
      description: item.contentSnippet,
      pub_date: new Date(item.pubDate),
      link: item.link,
      category: item.categories.join(","),
      creator: item.creator
    }));
  } catch (error) {
    console.error(`Error fetching feed: ${feedUrl}`, error);
    return [];
  }
}

router.get('/fetch-articles', async (req, res, next) => {
    const { channel } = req.query;
    const data = await fetchArticles(channel);
    console.log('data ', data);
    res.json(data);
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
