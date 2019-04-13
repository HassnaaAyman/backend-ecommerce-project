const express = require('express');
const logger = require('morgan');
const cors = require('cors')


require('./DBL/db');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productRouter = require('./routes/products');
const categoryRouter = require('./routes/categories');



const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/categories', categoryRouter);



app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500);
    res.send(err);
});

module.exports = app;