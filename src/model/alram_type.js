const mysqlConfig = require('../config/db_info').mysql;
const pool = require('mysql').createPool(mysqlConfig);

export const getAlarmTypes = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                conn.release();
                reject(err);
            }
            const sql = 'SELECT * FROM ALARM_TYPE';
            conn.query(sql, (err, rows) => {
                if (err) reject(err);
                conn.release();
                resolve(rows);
            });
        });
    });
};
