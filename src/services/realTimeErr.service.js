//service layer
const Alarm = require('../model/alram');

export const list = async () => {
    console.log('services/realTimeErr.service');

    let alarmList = [];
    await Alarm.getCurrentAlarm().then(result => {
        alarmList = result;
    });

    const alarmConverting = alarmList.reduce((acc, cur, arr) => {
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