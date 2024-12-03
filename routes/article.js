var express = require('express');
var router = express.Router();
const { fetchAndSaveArticles, getFilteredArticles } = require('../controllers/articleController');

// Route to fetch and save articles
router.get('/fetch-articles', fetchAndSaveArticles);
router.get('/get-articles', getFilteredArticles);


module.exports = router;
