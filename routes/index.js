var express = require('express');
var router = express.Router();
/**
 * Read
 */
router.get('/', function (req, res, next) {
  res.render('index');
});

module.exports = router;