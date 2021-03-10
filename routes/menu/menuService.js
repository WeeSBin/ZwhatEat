const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { v4: uuidv4 } = require('uuid');

const adapter = new FileSync('db.json');
const db = low(adapter);
/**
 * @description 메뉴 등록
 * @param {Object} body menu 'name'
 * @return {boolean}
 */
exports.registerMenu = (body) => {
    if (body.menu) {
        db.get('menu')
            .push({
                _id: uuidv4(),
                name: body.menu,
                group: body.group.split('-')[1]
            })
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
