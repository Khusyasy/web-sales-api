require("dotenv").config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client', 'dist')));

require("./config/database");

const usersRouter = require('./routes/users');
const transactionsRouter = require('./routes/transasctions');

app.use('/users', usersRouter);
app.use('/transactions', transactionsRouter);

module.exports = app;
