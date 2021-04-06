const express = require('express');

const apiRouter = express.Router();
const realTimeRouter = require('./realTimeErr');
const diskUseRateRouter = require('./diskUseRate');

apiRouter.use('/realTimeErr', realTimeRouter);
apiRouter.use('/diskUseRate', diskUseRateRouter)

module.exports = apiRouter;