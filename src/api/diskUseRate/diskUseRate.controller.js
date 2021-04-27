const diskUseRateService = require('../../services/diskUseRate/diskUseRate.service');
const restGmsService = require('../../services/RestGMS/restGMS.service')
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
            }
        });
    });

    const diskPartList = await restGmsService.getDiskPartInfoList();
    const uniqueServerId = diskPartList.reduce((acc, cur) => {
        acc.includes(cur.serverId) ? acc : acc.push(cur.serverId);
        return acc;
    }, []);

    const len_result = resultArr.length;
    const len_unique= uniqueServerId.length;
    for(let i = 0; i < len_unique; i++) {
        let flag = true;
        for (let j = 0; j < len_result; j++) {
            if (uniqueServerId[i] == resultArr[j].serverId) {
                flag = true;
                break;
            } else {
                flag = false;
            }
        }
        if (flag == false) {
            const tmp = {
                server_instance_id: null,
                server_instance_name: null,
                server_instance_state: null,
                vdu_id: null,
                system_instance_id: uniqueServerId[i],
                vm_id: null,
                vm_state: null,
                host_name: null,
                lastChanged: null,
                inUse: 1,
                systemId: null,
                serverId: uniqueServerId[i],
                cpu_usage: null,
                mem_usage: null,
                dp00_usage: 0,
                dp01_usage: 0,
                dp02_usage: 0,
                dp03_usage: 0,
                dp04_usage: 0,
                dp05_usage: 0,
                dp06_usage: 0,
                dp07_usage: 0,
                dp08_usage: 0,
                dp09_usage: 0,
            };
            resultArr.push(tmp);
        }
    }
    res.send(resultArr);
};