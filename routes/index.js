const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

/**
 *  Task
 */
exports.main = (req, res, next) => {
  db.defaults({ menu: [], group: {} })
      .write();
  res.render('index');
};