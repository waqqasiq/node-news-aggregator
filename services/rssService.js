const Parser = require('rss-parser');
const parser = new Parser({ customFields: { item: ['media:thumbnail'] } });

async function fetchArticles(feedUrl) {
    try {
        if (!feedUrl) {
            throw new Error('RSS feed URL is required.');
        }
    
        // Fetch the RSS feed
        const feed = await parser.parseURL(feedUrl);
        
        const articles = feed.items.map(item => {
            console.log('item w', item['media:thumbnail']?.$?.url);
            return {
                title: item.title,
                link: item.link,
                description: item.contentSnippet || item.description || '',
                pub_date: item.isoDate || item.pubDate || new Date().toISOString(),
                creator: item.creator || item.author || 'Unknown',
                feed_channel: feedUrl,
                thumbnail_url: item['media:thumbnail']?.$?.url
            }
        });
        // console.log('articles ', articles);

        

        return articles;
    } catch (error) {
        console.error('Error fetching RSS feed:', error.message);
        throw error; // Propagate the error to the caller
    }
}

module.exports = {
    fetchArticles
};
