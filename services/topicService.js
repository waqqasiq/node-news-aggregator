const nlp = require('compromise');

// Define the list of stop words
const STOP_WORDS = new Set([
    "i", "me", "my", "myself", "we", "our", "ours", "ourselves",
    "you", "your", "yours", "yourself", "yourselves", "he", "him",
    "his", "himself", "she", "her", "hers", "herself", "it", "its",
    "itself", "they", "them", "their", "theirs", "themselves",
    "what", "which", "who", "whom", "this", "that", "these", "those",
    "am", "is", "are", "was", "were", "be", "been", "being", "have",
    "has", "had", "having", "do", "does", "did", "doing", "a", "an",
    "the", "and", "but", "if", "or", "because", "as", "until", "while",
    "of", "at", "by", "for", "with", "about", "against", "between",
    "into", "through", "during", "before", "after", "above", "below",
    "to", "from", "up", "down", "in", "out", "on", "off", "over",
    "under", "again", "further", "then", "once", "here", "there",
    "when", "where", "why", "how", "all", "any", "both", "each", "few",
    "more", "most", "other", "some", "such", "no", "nor", "not", "only",
    "own", "same", "so", "than", "too", "very", "s", "t", "can",
    "will", "just", "don", "should", "now", "it’s", "it's", "here’s","here's"
]);



const extractTopics = (descriptions) => {
    const allTopics = new Set();

    descriptions.forEach((description) => {
        // Preprocess description: remove punctuation and stop words
        const cleanedDescription = description
            .replace(/[\.,-]/g, ' ') // Replace commas, dots, and hyphens with spaces
            .split(/\s+/) // Split by whitespace
            .filter((word) => !STOP_WORDS.has(word.toLowerCase())) // Remove stop words
            .join(' '); // Reassemble the cleaned description

        // Perform NLP on the cleaned description
        const doc = nlp(cleanedDescription);
        const topics = doc.nouns().out('array'); // Extract nouns as topics
        topics.forEach((topic) => {
            const normalizedTopic = topic.toLowerCase();
            if (!STOP_WORDS.has(normalizedTopic)) {
                allTopics.add(normalizedTopic); // Add only if it's not a stop word
            }
        });
    });

    return Array.from(allTopics); // Convert Set back to array
};


module.exports = {
    extractTopics
};
