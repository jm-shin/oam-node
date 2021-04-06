//diskUseRateRouter
const diskUseRateRouter = require('express').Router();
const diskUseRateCtrl = require('./diskUseRate.ctrl');

diskUseRateRouter.get('/', diskUseRateCtrl.getServerInfoList);

module.exports = diskUseRateRouter;