const express = require('express');

const alarmRouter = express.Router();
const alarmCtrl   = require('./alarm.controller');

alarmRouter.get('/current', alarmCtrl.list);
alarmRouter.get('/type', alarmCtrl.alarmTypeList);

module.exports = alarmRouter;