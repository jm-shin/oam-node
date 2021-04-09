//diskUseRateRouter
const diskUseRateRouter = require('express').Router();
const diskUseRateCtrl = require('./diskUseRate.controller');

diskUseRateRouter.get('/list', diskUseRateCtrl.getDiskUseRateList);

module.exports = diskUseRateRouter;