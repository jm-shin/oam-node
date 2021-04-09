const diskUseRateService = require('../../services/diskUseRate/diskUseRate.service');

/**
 * 기존 URL: /RestGMS/alarm/current
 * 변경된 URL: /api/alarm
 */
exports.getDiskUseRateList = async (req, res) => {
    let resultArr = [];

    const serverInfoList = await diskUseRateService.getServerInfo();
    const systemStatList = await diskUseRateService.getSystemStat();

    await serverInfoList.forEach((serVal) => {
         systemStatList.forEach((sysVal) => {
            if (serVal.server_instance_id === sysVal.serverId) {
                //delete serVal.server_instance_id;
                const tmp = { ...serVal, ...sysVal };
                resultArr.push(tmp);
            };
        });
    });
    res.send(resultArr);
    res.end();
};