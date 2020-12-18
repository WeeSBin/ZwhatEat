const express = require('express');
const router = express.Router();

const index = require('./index');
const menuRouter = require('./menu/menuRouter');

router.get('/', index);
router.use('/menu', menuRouter);

module.exports = router;