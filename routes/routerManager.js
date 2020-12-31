const express = require('express');
const router = express.Router();

const index = require('./index');
const menuRouter = require('./menu/menuRouter');
const groupRouter = require('./group/groupRouter');

router.get('/', index);
router.use('/menu', menuRouter); // 메뉴
router.use('/group', groupRouter); // 그룹

module.exports = router;