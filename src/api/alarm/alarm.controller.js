//controller layer
const alarmService = require('../../services/alram/alarm.service');

/**
 * 기존 URL: /RestGMS/alarm/current
 * 변경된 URL: /api/alarm
 */
exports.list = async (req, res) => {
    const alarmList = await alarmService.list();
    res.send(alarmList);
    res.end();
};

/**
 * alarm type list 가져오기
 * 기존 url: /RestGMS/alarmoption/alarmtype
 * 변경: /api/alarm/type
 */

exports.alarmTypeList = async (req, res) => {
    const alarmTypeList = await alarmService.alarmTypes();
    res.send(alarmTypeList);
};
