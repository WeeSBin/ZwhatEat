const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);
/**
 * @description 메뉴 등록
 * @param {Object} body menu 'name'
 * @return {boolean}
 */
exports.registerMenu = (body) => {
    if (body.name) {
        db.get('menu')
            .push({name: body.name})
            .write();
        return true;
    } else {
        return false;
    }
};
/**
 * @description 메뉴 가져오기
 * @return {Array.<string, string>}
 */
exports.getMenu = () => {
    return db.get('menu').value();
};
