//service layer
const Alarm = require('../model/alram');
const AlarmType = require('../model/alram_type');

const location = '[location]' + __dirname;

export const list = async () => {
    console.log('services/realTimeErr.service');

    let alarmList = [];
    await Alarm.getCurrentAlarm().then(result => {
        alarmList = result;
    });

    const alarmConverting = alarmList.reduce((acc, cur) => {
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

    return alarmConverting;
};

export const alarmTypes = async () => {
    console.log(location, '[func] alarmTypes');

    let alarmTypes = [];
    await AlarmType.getAlarmTypes().then(result => {
       alarmTypes = result;
    });

    const alarmTypeList = alarmTypes.reduce((acc, cur) => {
        let tmp = {
            key: cur.ALARMNAME,
            value: cur.ALARMTYPE,
        };
        acc.push(tmp);
        return acc;
    }, []);

    return alarmTypeList;
};