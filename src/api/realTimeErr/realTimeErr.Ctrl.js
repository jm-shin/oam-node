//controller layer
const alarmService = require('../../services/realTimeErr.service');

exports.list = async (req, res) => {
    console.log('[log] realTimErr Controller');

    let alarmList = [];
    alarmList = await alarmService.list();

    res.send(alarmList);
    console.log('realTimeErr list result:', alarmList);
    res.end();
};