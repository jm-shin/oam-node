//database access layer
const mysql = require('mysql');
const mysqlConfig = require('../config/db_info').mysql;

const pool = mysql.createPool(mysqlConfig);

export const selectCurrent = () => {
    return new Promise((resolve, reject) => {
            pool.getConnection((err, conn) => {
                if (err) {
                    conn.release();
                    reject(err);
                };
                const sql = 'SELECT ALARMID, SYSTEM_INSTANCE_ID, SERVER_INSTANCE_ID, HOST_NAME, EVENTTIME, ACKTIME, CLOSETIME,\n' +
                            'ALARMTYPE, ALARMCODE, SEVERITY, SOURCE, CAUSE, DESCRIPTION, ACKED, CLOSED, ACKBY, CLOSEBY\n' +
                            'FROM ALARM\n' +
                            'WHERE CLOSED = 0 AND SEVERITY != 0\n' +
                            'ORDER BY EVENTTIME DESC\n' +
                            'LIMIT 1000';
                conn.query(sql, (err, rows) => {
                    if (err) reject(err);
                    conn.release();
                    resolve(rows);
                });
            });
    });
};
