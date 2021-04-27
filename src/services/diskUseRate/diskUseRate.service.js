const gvServerInfo = require('../../model/gv_server_info');
const statusSystem = require('../../model/status_system');
const PartitionInfo = require('../../model/partition_info');

export const getServerInfo = async () => {
    let gvServerInfoList = [];
    await gvServerInfo.selectAll().then(result => {
        gvServerInfoList = result;
    });

    const result = gvServerInfoList.reduce((acc, cur) => {
       let tmp = {
           server_instance_id: cur.SERVER_INSTANCE_NAME,
           server_instance_name: cur.SERVER_INSTANCE_ID,
           server_instance_state: cur.SERVER_INSTANCE_STATE,
           vdu_id: cur.VDU_ID,
           system_instance_id: cur.SYSTEM_INSTANCE_NAME,
           vm_id: cur.VM_ID,
           vm_state: cur.VM_STATE,
           host_name: cur.HOST_NAME,
           host_state: cur.HOST_STAT,
           lastChanged: null,
           inUse: cur.VALIDSTATE
       };
       acc.push(tmp);
       return acc;
    }, []);

    return result;
};

export const getSystemStat = async () => {
    let statusSystemList = [];
    await statusSystem.selectAll().then(result => {
        statusSystemList = result;
    });

    const result = statusSystemList.reduce((acc, cur) => {
        let tmp = {
            systemId: cur.SYSTEM_INSTANCE_ID,
            serverId: cur.SERVER_INSTANCE_ID,
            cpu_usage: cur.CPU_USAGE,
            mem_usage: cur.MEM_USAGE,
            dp00_usage: cur.DP00_USAGE,
            dp01_usage: cur.DP01_USAGE,
            dp02_usage: cur.DP02_USAGE,
            dp03_usage: cur.DP03_USAGE,
            dp04_usage: cur.DP04_USAGE,
            dp05_usage: cur.DP05_USAGE,
            dp06_usage: cur.DP06_USAGE,
            dp07_usage: cur.DP07_USAGE,
            dp08_usage: cur.DP08_USAGE,
            dp09_usage: cur.DP09_USAGE,
        };
        acc.push(tmp);
        return acc;
    }, []);

    return result;
};

export const getDiskUseRateList = async () => {
    let resultArr = [];

    const gvServerInfoList = await gvServerInfo.selectAll();
    const statusSystemList = await statusSystem.selectAll();
    const diskPartList = await PartitionInfo.selectAll();

    await gvServerInfoList.forEach((serVal) => {
        statusSystemList.forEach((sysVal) => {
            if (serVal.SERVER_INSTANCE_NAME === sysVal.SERVER_INSTANCE_ID) {
                //delete serVal.server_instance_id;
                const tmp = {
                    server_instance_id: serVal.SERVER_INSTANCE_NAME,
                    server_instance_name: serVal.SERVER_INSTANCE_ID,
                    server_instance_state: serVal.SERVER_INSTANCE_STATE,
                    vdu_id: serVal.VDU_ID,
                    system_instance_id: serVal.SYSTEM_INSTANCE_NAME,
                    vm_id: serVal.VM_ID,
                    vm_state: serVal.VM_STATE,
                    host_name: serVal.HOST_NAME,
                    host_state: serVal.HOST_STAT,
                    lastChanged: null,
                    inUse: serVal.VALIDSTATE, //
                    systemId: sysVal.SYSTEM_INSTANCE_ID,
                    serverId: sysVal.SERVER_INSTANCE_ID,
                    cpu_usage: sysVal.CPU_USAGE,
                    mem_usage: sysVal.MEM_USAGE,
                    dp00_usage: sysVal.DP00_USAGE,
                    dp01_usage: sysVal.DP01_USAGE,
                    dp02_usage: sysVal.DP02_USAGE,
                    dp03_usage: sysVal.DP03_USAGE,
                    dp04_usage: sysVal.DP04_USAGE,
                    dp05_usage: sysVal.DP05_USAGE,
                    dp06_usage: sysVal.DP06_USAGE,
                    dp07_usage: sysVal.DP07_USAGE,
                    dp08_usage: sysVal.DP08_USAGE,
                    dp09_usage: sysVal.DP09_USAGE
                };
                resultArr.push(tmp);
            }
        });
    });

    const uniqueServerId = diskPartList.reduce((acc, cur) => {
        acc.includes(cur.SERVER_INSTANCE_ID) ? acc : acc.push(cur.SERVER_INSTANCE_ID);
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
                server_instance_id: uniqueServerId[i],
                server_instance_name: null,
                server_instance_state: null,
                vdu_id: null,
                system_instance_id: null,
                vm_id: null,
                vm_state: null,
                host_name: null,
                lastChanged: null,
                inUse: null,
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
    return resultArr;
};
