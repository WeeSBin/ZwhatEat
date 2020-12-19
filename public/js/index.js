import {request} from './common/request.js';
import {Table} from './common/table.js';
/**
 * Init
 */
const table01 = new Table();
request('GET', '/menu', {}, function (res) {
    table01.setConfig({
        targetId: 'table01'
    });
    table01.setData(res.menuList);
    table01.makeTable();
    // todo 리스트 뿌리기
});
/**
 * Event
 */
const button = document.getElementById('register');
button.addEventListener('keyup', function (e) {
    var key = e.key || e.keyCode;
    if (key === 'Enter' || key === 13) {
        request('POST', '/menu', {name: this.value}, function (res) {
            if (res.hasOwnProperty('menuList')) {
                // todo 리스트 뿌리기
            }
        })
    }
});