const diskUseRateService = require('../../services/diskUseRate/diskUseRate.service');
/**
 * 기존 URL: /RestGMS/alarm/current
 * 변경된 URL: /api/alarm
 */
exports.list = async (req, res) => {
    const diskUseRateList = await diskUseRateService.getDiskUseRateList();
    res.send(diskUseRateList);
};