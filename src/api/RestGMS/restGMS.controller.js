const restGmsService = require('../../services/RestGMS/restGMS.service');

exports.getDiskPartList = async (req, res, next) => {
    const diskPartList = await restGmsService.getDiskPartInfoList();
    res.send(diskPartList);
};

exports.getServerInfoList = async (req, res) => {
    const serverInfoList = await restGmsService.getServerInfoList();
    res.send(serverInfoList);
};

exports.getSystemStatList = async (req, res) => {
    const systemStatList = await restGmsService.getSystemStatList();
    res.send(systemStatList);
};

exports.getHaStatusList = async (req, res) => {
    const haStatusList = await restGmsService.getStatHa();
    res.send(haStatusList);
};

exports.getProcStatusList = async (req, res) => {
    const procStatusList = await  restGmsService.getProcStatList();
    res.send(procStatusList);
};