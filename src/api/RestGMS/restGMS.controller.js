const restGmsService = require('../../services/RestGMS/restGMS.service');

exports.getDiskPartList = async (req, res, next) => {
    const diskPartList = await restGmsService.getDiskPartInfoList();
    res.send(diskPartList);
    res.end();
};

exports.getServerInfoList = async (req, res) => {
    const serverInfoList = await restGmsService.getServerInfoList();
    res.send(serverInfoList);
    res.end();
};

exports.getSystemStatList = async (req, res) => {
    const systemStatList = await restGmsService.getSystemStatList();
    res.send(systemStatList);
    res.end();
};

exports.getHaStatusList = async (req, res) => {
    const haStatusList = await restGmsService.getStatHa();
    res.send(haStatusList);
    res.end();
};

exports.getProcStatusList = async (req, res) => {
    const procStatusList = await  restGmsService.getProcStatList();
    res.send(procStatusList);
    res.end();
};