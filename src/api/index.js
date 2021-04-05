const express = require('express');

const apiRouter = express.Router();
const realTimeRouter = require('./realTimeErr/index');

apiRouter.use('/real', realTimeRouter);

module.exports = apiRouter;