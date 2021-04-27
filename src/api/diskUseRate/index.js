//diskUseRateRouter
const diskUseRateRouter = require('express').Router();
const diskUseRateCtrl = require('./diskUseRate.controller');

diskUseRateRouter.get('/list', diskUseRateCtrl.list);

module.exports = diskUseRateRouter;