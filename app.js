const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
/**
 * Router Description
 */
const managerRouter = require('./routes/manager');

const app = express();
/**
 * View Engine Description
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
/**
 * Other Setting
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
/**
 * Router Description
 */
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', managerRouter);

module.exports = app;
