var express = require('express');
var router = express.Router();
const { fetchAndSaveArticles } = require('../controllers/articleController');

// Route to fetch and save articles
router.get('/fetch-articles', fetchAndSaveArticles);


module.exports = router;
