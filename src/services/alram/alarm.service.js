//service layer
const Alarm = require('../../model/alram');
const AlarmType = require('../../model/alram_type');

export const list = async () => {
    let currentAlarmList = [];
    await Alarm.selectCurrent().then(result => {
        currentAlarmList = result;
    });

    const result = currentAlarmList.reduce((acc, cur) => {
        let tmp = {
            alarmId: cur.ALARMID,
            systemId: cur.SYSTEM_INSTANCE_ID,
            serverId: cur.SERVER_INSTANCE_ID,
            hostName: cur.HOST_NAME,
            firstTime: cur.EVENTTIME,
            lastTime: cur.ACKTIME,
            confirmTime: cur.CLOSETIME,
            eventTypeId: cur.ALARMTYPE,
            eventCodeId: cur.ALARMCODE,
            severity: cur.SEVERITY,
            source: cur.SOURCE,
            alarmCause: cur.CAUSE,
            alarmMessage: cur.DESCRIPTION,
            confirmed: cur.ACKED,
            cleared: cur.CLOSED,
            confirmUser: cur.ACKBY,
            clearedUser: cur.CLOSEBY,
        };
        acc.push(tmp);
        return acc;
    }, []);

    return result;
};

export const alarmTypes = async () => {
    let alarmTypeList = [];
    await AlarmType.selectAll().then(result => {
        alarmTypeList = result;
    });

    const result = alarmTypeList.reduce((acc, cur) => {
        let tmp = {
            key: cur.ID,
            value: cur.VALUE.toString(),
        };
        acc.push(tmp);
        return acc;
    }, []);

    return result;
};