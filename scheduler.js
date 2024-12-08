const schedule = require('node-schedule');
const rssService = require('./services/rssService'); 
const articleService = require('./services/articleService');
const rss_feeds = require('./config/rssFeeds');


// Schedule the task to run once at the start of every hour
schedule.scheduleJob('0 * * * *', async () => {
    console.log('Fetching articles from multiple feeds...');

    for (const url of rss_feeds) {
        try {
            console.log(`Fetching articles from: ${url}`);
            const articles = await rssService.fetchArticles(url);
            await articleService.saveArticles(articles);
            console.log(`Articles from ${url} saved successfully!`);
        } catch (error) {
            console.error(`Error fetching or saving articles for ${url}:`, error);
        }
    }
});
