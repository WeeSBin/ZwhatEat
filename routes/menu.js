const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

/**
 *  Task
 */
exports.registerMenu = (req, res, next) => {
  const data = req.body.data;
  const sendBody = {};
  if (data.name) {
    db.get('menu')
        .push({name: data.name})
        .write();
    sendBody.msg = '성공!';
  }
  // todo response 형태를 통일시킬 순 없을까? 상속이 없지...?
  res.send(sendBody);
};

exports.getMenu = (req, res, next) => {
  res.json({
    menuList: db.get('post').value()
  })
};