const gvServerInfo = require('../../model/gv_server_info');

export const getServerInfo = async () => {
    let gvServerInfoList = [];
    await gvServerInfo.getServerInfo().then(result => {
        gvServerInfoList = result;
    });

    const converting = gvServerInfoList.reduce((acc, cur) => {
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

    return converting;
};