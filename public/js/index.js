import {request} from './controller.js';

/**
 * Init
 */
request('GET', 'index', 'getMenu', {}, function (res) {
    console.log(res);
});
/**
 * Event
 */
const button = document.getElementById('register');
button.addEventListener('keyup', function (e) {
    var key = e.key || e.keyCode;
    if (key === 'Enter' || key === 13) {
        request('POST', 'menu', 'registerMenu', {name: this.value}, function (res) {
            alert(res.msg)
        });
    }
});