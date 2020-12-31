const express = require('express');
const router = express.Router();

const groupService = require('./groupService');

// 그룹 조회
router.get('/', function (req, res, next) {
    res.json({
        groupList: groupService.getGroup()
    })
});

module.exports = router;
