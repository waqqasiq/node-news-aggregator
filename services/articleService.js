const { Article, ArticleTopic, Topic } = require('../models');
const { Op } = require('sequelize');
const { extractTopics } = require('./topicService');

// async function saveArticles(articles) {
//     if (!Array.isArray(articles) || articles.length === 0) {
//         console.log('No articles to save.');
//         return;
//     }

//     try {
//         await Article.bulkCreate(articles, {
//             ignoreDuplicates: true,
//         });

//         console.log(`${articles.length} articles processed for saving.`);
//     } catch (error) {
//         console.error('Error saving articles:', error);
//         throw error;
//     }
// }

// async function saveArticles(articles) {
//     for (const article of articles) {
//         try {
//             // Save the article if it doesn't already exist
//             const [savedArticle, created] = await Article.findOrCreate({
//                 where: { link: article.link }, // Use a unique identifier
//                 defaults: {
//                     title: article.title,
//                     description: article.description,
//                     pub_date: new Date(article.pub_date),
//                     link: article.link,
//                     thumbnail_url: article.thumbnail_url,
//                     feed_channel: article.feed_channel,
//                     creator: article.creator || article.author || 'Unknown'
//                 },
//             });

//             if (created) {
//                 // Extract topics and save them
//                 const topics = extractTopics([article.description]);
//                 console.log('topics w ', topics);

//                 await Promise.all(
//                     topics.map((topic_item, idx) => {
//                         console.log('topic idx ', idx);
//                         console.log('topic topic  ', topic_item);
//                         ArticleTopic.findOrCreate({
//                             where: { topic_name: topic_item }, // Use a unique identifier
//                             defaults: {
//                                 topic_name: topic_item.topic,
//                                 article_id: savedArticle.id,
//                             },
//                         })
//                     }
//                     )
//                 );
//             }
//         } catch (error) {
//             console.error(`Error saving article: ${article.title}`, error);
//         }
//     }
// }

async function saveArticles(articles) {
    for (const article of articles) {
        try {
            // Save the article if it doesn't already exist
            const [savedArticle, created] = await Article.findOrCreate({
                where: { link: article.link }, // Use a unique identifier
                defaults: {
                    title: article.title,
                    description: article.description,
                    pub_date: new Date(article.pub_date),
                    link: article.link,
                    thumbnail_url: article.thumbnail_url,
                    feed_channel: article.feed_channel,
                    creator: article.creator || article.author || 'Unknown',
                },
            });

            if (created) {
                // Extract topics and save them
                const topics = extractTopics([article.description]);

                await Promise.all(
                    topics.map(async (topicName) => {
                        try {
                            // Check if the topic exists in the Topic table
                            const [topic] = await Topic.findOrCreate({
                                where: { name: topicName }, // `name` is assumed to be the column for topic names
                                defaults: { name: topicName },
                            });

                            // Create the association in the ArticleTopic table
                            await ArticleTopic.create({
                                article_id: savedArticle.id, // Foreign key to the Article table
                                topic_id: topic.id,         // Foreign key to the Topic table
                            });
                        } catch (error) {
                            console.error(`Error saving topic: ${topicName}`, error);
                        }
                    })
                );
            }
        } catch (error) {
            console.error(`Error saving article: ${article.title}`, error);
        }
    }
}



const fetchFilteredArticles = async ({ keyword, start_date, end_date, page = 1, limit = 10 }) => {

    const where = {};

    // // Apply filters if provided
    // if (keyword) where.description = { [Op.like]: `%${keyword}%` };
    // if (start_date) where.pub_date = { [Op.gte]: new Date(start_date) };
    // if (end_date) where.pub_date = { [Op.lte]: new Date(end_date) };

    // // Query the database
    // return await Article.findAll({ where });

    if (keyword) where.description = { [Op.like]: `%${keyword}%` };
    if (start_date) where.pub_date = { [Op.gte]: new Date(start_date) };
    if (end_date) where.pub_date = { [Op.lte]: new Date(end_date) };

    const offset = (page - 1) * limit; // Calculate the offset

    const { rows: articles, count: totalCount } = await Article.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['pub_date', 'DESC']], // Sort by publication date (latest first)
    });

    return {
        articles,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCount / limit),
        totalCount,
    }

};


const getArticleByIdWithTopics = async (id) => {
    return await Article.findByPk(id, {
        include: [
            {
                model: ArticleTopic,
                as: 'articleTopics',
                include: [
                    {
                        model: Topic,
                        as: 'topic',
                        attributes: ['id', 'name'], // Only include necessary fields
                    },
                ],
            },
        ],
    });
};


module.exports = {
    saveArticles,
    fetchFilteredArticles,
    getArticleByIdWithTopics
};
