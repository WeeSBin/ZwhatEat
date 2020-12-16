var express = require('express');
var router = express.Router();

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

/* GET home page. */
router.get('/', function(req, res, next) {

  db.defaults({ menu: [], group: {} })
      .write();

  res.render('index', { title: 'Express' });
});

module.exports = router;
