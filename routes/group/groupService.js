const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

/**
 * @description 그룹 가져오기
 * @return {Array.<string, string>}
 */
exports.getGroup = () => {
    return db.get('group').value();
};