const diskUseRateService = require('../../services/diskUseRate/diskUseRate.service');

exports.getServerInfoList = async (req, res) => {
    let serverInfoList = [];
    serverInfoList = await diskUseRateService.getServerInfo();

    res.send(serverInfoList);
    res.end();
};