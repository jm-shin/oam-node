const express = require('express');

const apiRouter = express.Router();
const realTimeRouter = require('./realTimeErr/index');

apiRouter.use('/realTimeErr', realTimeRouter);

module.exports = apiRouter;