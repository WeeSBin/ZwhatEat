import {request} from './common/request.js';
import {Table} from './common/table.js';
/**
 * Init
 */
request('GET', '/menu', {}, function (res) {
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