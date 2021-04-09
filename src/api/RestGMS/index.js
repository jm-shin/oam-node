const RestGmsRouter = require('express').Router();
const restGmsCtrl = require('./restGMS.controller');

RestGmsRouter.get('/disk-part', restGmsCtrl.getDiskPartList);
RestGmsRouter.get('/server', restGmsCtrl.getServerInfoList);
RestGmsRouter.get('/system-stat', restGmsCtrl.getServerInfoList);
RestGmsRouter.get('/ha-stat', restGmsCtrl.getHaStatusList);
RestGmsRouter.get('/proc-stat', restGmsCtrl.getProcStatusList);

module.exports = RestGmsRouter;
