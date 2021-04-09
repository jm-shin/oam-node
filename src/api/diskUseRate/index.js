//diskUseRateRouter
const diskUseRateRouter = require('express').Router();
const diskUseRateCtrl = require('./diskUseRate.ctrl');

diskUseRateRouter.get('/list', diskUseRateCtrl.getDiskUseRateList);

module.exports = diskUseRateRouter;