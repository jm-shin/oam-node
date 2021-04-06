//controller layer
const alarmService = require('../../services/realTimeErr.service');

/**
 * 기존 URL: /RestGMS/alarm/current
 * 변경된 URL: /api/realTimeErr
 */
exports.list = async (req, res) => {
    console.log('[log] realTimErr Controller');

    let alarmList = [];
    alarmList = await alarmService.list();

    res.send(alarmList);
    res.end();
};

/**
 * alarm type list 가져오기
 * 기존 url: /RestGMS/alarmoption/alarmtype
 * 변경: /api/realTimeErr/type
 */

exports.alarmTypeList = async (req, res) => {

    let alarmTypeList = [];
    alarmTypeList = await alarmService.alarmTypes();

    res.send(alarmTypeList);
    res.end();
};
