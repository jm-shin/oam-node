const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const morgan = require('morgan');

//router
const apiRouter = require('./api/index')

app.set('port', process.env.PORT || 3001);

app.use('/api', apiRouter);

app.use(morgan('dev'));
app.use(express.json());

app.use(express.urlencoded({extended:false}));

// app.use((req, res, next) => {
//     const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
//     error.status = 404;
//     next(error);
// });

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});

