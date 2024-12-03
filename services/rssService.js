const Parser = require('rss-parser');
const parser = new Parser();

async function fetchArticles(feedUrl) {
    try {
        if (!feedUrl) {
            throw new Error('RSS feed URL is required.');
        }

        // Fetch the RSS feed
        const feed = await parser.parseURL(feedUrl);

        // Parse and structure articles
        const articles = feed.items.map(item => ({
            title: item.title || 'Untitled',
            link: item.link || '',
            description: item.contentSnippet || item.description || '',
            pub_date: item.isoDate || item.pubDate || new Date().toISOString(),
            creator: item.creator || item.author || 'Unknown'
        }));

        return articles;
    } catch (error) {
        console.error('Error fetching RSS feed:', error.message);
        throw error; // Propagate the error to the caller
    }
}

module.exports = {
    fetchArticles
};
