const diskUseRateService = require('../../services/diskUseRate/diskUseRate.service');

exports.getDiskUseRateList = async (req, res) => {
    let resultArr = [];

    let serverInfoList = await diskUseRateService.getServerInfo();
    let systemStatList = await diskUseRateService.getSystemStat();

    await serverInfoList.forEach((serVal) => {
         systemStatList.forEach((sysVal) => {
            if (serVal.server_instance_id === sysVal.serverId) {
                //delete serVal.server_instance_id;
                const tmp = { ...serVal, ...sysVal };
                resultArr.push(tmp);
            }
        });
    });
    res.send(resultArr);
    res.end();
};