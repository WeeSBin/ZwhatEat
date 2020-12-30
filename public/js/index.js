import {request} from './common/request.js';
import {Kanban} from './common/kanban.js';
/**
 * Init
 */
const config = {
    targetId: 'board01',
};
const table01 = new Kanban(config); // 테이블 생성

async function initView () {
    await request('GET', '/menu/test', {}, function (res) {
        console.log('test:' + res);
    });
    await request('GET', '/menu', {}, function (res) {
        // table01.setData(res.menuList);
        console.log('menu:' + res);
    });
}
initView();
// 첫 조회
/**
 * Event
 */
// 등록 input 엔터 이벤트
document.getElementById('register').addEventListener('keyup', function (e) {
    const key = e.key || e.keyCode;
    if (key === 'Enter' || key === 13) {
        request('POST', '/menu', {name: this.value}, function (res) {
            if (res.hasOwnProperty('menuList')) {
                table01.setData(res.menuList);
            }
        })
    }
});
// 메뉴 추첨
document.getElementById('whatEat').addEventListener('click', function (e) {
    request('GET', '/menu/whatEat', null, function (res) {
        if (res.hasOwnProperty('whatEat')) {
            alert(res.whatEat.name)
        }
    })
});
