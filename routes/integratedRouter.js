var express = require('express');
var router = express.Router();

const indexRouter = require('./index');
const menuRouter = require('./menu');

/**
 *  Create
 */
router.post('/', function (req, res, next) {
    const body = req.body;
    //todo 이런 검증을 한 곳에서 하면 좋을까? 할순 있나?
    if (!body.hasOwnProperty('module')) {
        // todo Error
    }
    switch (body.module) {
        case 'menu':
            menuRouter[body.task](req, res, next);
    }
});

/**
 *  Read
 */
router.get('/', function (req, res, next) {
    const body = req.body;
    if (!body.hasOwnProperty('module')) {
        indexRouter.main(req, res, next);
    }
    switch (body.module) {
        case 'menu':
            menuRouter[body.task](req, res, next);
    }
});

/**
 *  Update
 */
router.put('/', function (req, res, next) {
});

/**
 *  Delete
 */
router.delete('/', function (req, res, next) {
});

module.exports = router;
