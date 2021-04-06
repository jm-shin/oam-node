const express = require('express');

const realTimeErrRouter = express.Router();
const realTimeErrCtrl   = require('./realTimeErr.Ctrl');

realTimeErrRouter.get('/', realTimeErrCtrl.list);
realTimeErrRouter.get('/type', realTimeErrCtrl.alarmTypeList);

module.exports = realTimeErrRouter;