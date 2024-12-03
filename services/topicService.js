const nlp = require('compromise');
const { Article, Topic } = require('../models');

async function extractAndSaveTopics(description, articleId) {
    const doc = nlp(description);
    const topics = doc.nouns().out('array');
    console.log('topics ', topics);

    // // For each topic, check if it exists, if not, create it
    // for (let topicName of topics) {
    //     let [topic, created] = await Topic.findOrCreate({
    //         where: { name: topicName },
    //     });

    //     // Find the article by ID
    //     const article = await Article.findByPk(articleId);
    //     if (article) {
    //         // Associate the topic with the article
    //         await article.addTopic(topic);
    //     }
    // }
}

module.exports = { extractAndSaveTopics };
