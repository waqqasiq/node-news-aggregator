var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
      success: true,
      message: "news-aggregator-api",
      created_at: '2024-12-03'
    });
});

module.exports = router;
