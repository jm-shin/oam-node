const express = require('express');

const apiRouter = express.Router();
const alarmRouter = require('./alarm');
const diskUseRateRouter = require('./diskUseRate');
const restGmsRouter = require('./RestGMS');

apiRouter.use('/alarm', alarmRouter);
apiRouter.use('/disk-use-rate', diskUseRateRouter);
apiRouter.use('/gms', restGmsRouter);

module.exports = apiRouter;