const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const morgan = require('morgan');

//env set
require('dotenv').config();

//router
const apiRouter = require('./api/index');

app.set('port', process.env.PORT || 3000);

app.use('/api', apiRouter);

app.use(morgan('dev'));
app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});

