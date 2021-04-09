const PartitionInfo = require('../../model/partition_info');
const gvServerInfo = require('../../model/gv_server_info');
const statusSystem = require('../../model/status_system');
const statusHa = require('../../model/status_ha');
const statusProc = require('../../model/status_proc');

const getDiskPartInfoList = async () => {
    const diskPartList = await PartitionInfo.selectAll();
    const result = diskPartList.reduce((acc, cur) => {
       let tmp = {
           systemId: cur.SYSTEM_INSTANCE_ID,
           serverId: cur.SERVER_INSTANCE_ID,
           partitionId: cur.PARTITIONID,
           dpName: cur.DPNAME,
           validate: cur.CARE,
       }
       acc.push(tmp);
       return acc;
    }, []);

    return result;
};

const getServerInfoList = async () => {
    const gvServerInfoList = await gvServerInfo.selectAll();
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

const getSystemStatList = async () => {
    const systemStatList = await statusSystem.selectAll();
    const result = systemStatList.reduce((acc, cur) => {
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

const getStatHa = async () => {
    const statusHaList = await statusHa.selectAll();
    const result = statusHaList.reduce((acc, cur) => {
       const tmp = {
           systemId: cur.SYSTEM_INSTANCE_ID,
           serverId: cur.SERVER_INSTANCE_ID,
           hbtStatus: cur.HBTSTATUS,
           mandatoryFlag: cur.MANDATORY_FLAG,
           ip: cur.IP,
           name: cur.NAME,
           infinite_loop_enable: cur.INFINITE_LOOP_ENABLE,
           infinite_loop_rechecknum: cur.INFINITE_LOOP_RECHECKNUM,
           infinite_loop_recheckdur: cur.INFINITE_LOOP_RECHCKDUR,
           proc_rechecknum: cur.PROC_RECHECKNUM,
           proc_recheckdur: cur.PROC_RECHECKDUR,
       };
       acc.push(tmp);
       return acc;
    }, []);

    return result;
};

const getProcStatList = async () => {
    const procStatList = await statusProc.selectAll();
    const result = procStatList.reduce((acc, cur) => {
        const tmp = {
            systemId: cur.SYSTEM_INSTANCE_ID,
            serverId: cur.SERVER_INSTANCE_ID,
            vaild: cur.VALID,
            pid: cur.PID,
            ppid: cur.PPID,
            name: cur.NAME,
            alias: cur.ALIAS,
            type: cur.TYPE,
        };
        acc.push(tmp);
        return acc;
    }, []);

    return result;
};

module.exports.getDiskPartInfoList = getDiskPartInfoList;
module.exports.getServerInfoList = getServerInfoList;
module.exports.getSystemStatList = getSystemStatList;
module.exports.getStatHa = getStatHa;
module.exports.getProcStatList = getProcStatList;