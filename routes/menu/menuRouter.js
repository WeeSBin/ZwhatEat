const express = require('express');
const router = express.Router();

const menuService = require('./menuService');

const _collection = require('lodash/collection');
/**
 * Create
 *
 */
// 단순 메뉴 등록
router.post('/', function (req, res, next) {
    if (menuService.registerMenu(req.body)) {
        res.json({
            menuList: menuService.getMenu()
        });
    } else {
        res.json({
            msg: '실패했어요!'
        });
    }
});
/**
 * Read
 */
// 단순 메뉴 조회
router.get('/', function (req, res, next) {
    res.json({
        menuList: menuService.getMenu()
    });
});
// 메뉴 추첨
router.get('/whatEat', function (req, res, next) {
    const menuList = menuService.getMenu();
    res.json({
        whatEat: _collection.sample(menuList)
    })
});

router.get('/test', function (req, res, next) {
    setTimeout(() => {
        res.json({
            whatEat: 'test'
        })
    }, 2000)
});

module.exports = router;