const express = require('express');
const router = express.Router();

const menuService = require('./menuService');
/**
 * Create
 */
router.post('/', function (req, res, next) {
    if (menuService.registerMenu(req.body)) {
        res.json(menuService.getMenu());
    } else {
        res.json({
            msg: '실패했어요!'
        })
    }
});
/**
 * Read
 */
router.get('/', function (req, res, next) {
    res.json(menuService.getMenu());
});

module.exports = router;