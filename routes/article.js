var express = require('express');
var router = express.Router();
const articleController = require('../controllers/articleController');

// Route to fetch and save articles
router.get('/fetch-articles', articleController.fetchAndSaveArticles);
router.get('/get-articles', articleController.getFilteredArticles);


module.exports = router;
