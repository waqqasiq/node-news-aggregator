const schedule = require('node-schedule');
const { fetchArticles } = require('./services/rssService'); // Adjust the path to your service
const { saveArticles } = require('./services/articleService'); // Adjust the path to your service

// Schedule the task to run at the start of every hour
schedule.scheduleJob('0 * * * *', async () => {
    console.log('Fetching articles...');
    try {
        const articles = await fetchArticles('https://www.wired.com/feed/rss');
        await saveArticles(articles); // Logic to save articles in MySQL
        console.log('Articles saved successfully!');
    } catch (error) {
        console.error('Error during scheduled article fetching:', error);
    }
});
