const dbConfig = require('../config/db_info').mysql;
const pool = require('mysql').createPool(dbConfig);

export const selectAll = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                conn.release();
                reject(err)
            }
            const sql = 'SELECT A.SYSTEM_INSTANCE_ID SYSTEM_INSTANCE_ID, A.SERVER_INSTANCE_ID SERVER_INSTANCE_ID, \n' +
                        'CPU_USAGE DIV 10 AS CPU_USAGE, MEM_USAGE DIV 10 AS MEM_USAGE, \n' +
                        'DP00_USAGE, DP01_USAGE, DP02_USAGE, DP03_USAGE, DP04_USAGE,\n' +
                        'DP05_USAGE, DP06_USAGE, DP07_USAGE, DP08_USAGE, DP09_USAGE\n' +
                        'FROM STATUS_SYSTEM A, GV_SERVER_INFO B\n' +
                        'WHERE A.DATECREATED > DATE_ADD(NOW(), INTERVAL -20 SECOND)\n' +
                        'AND A.SYSTEM_INSTANCE_ID = B.SYSTEM_INSTANCE_NAME\n' +
                        'AND A.SERVER_INSTANCE_ID = B.SERVER_INSTANCE_NAME\n' +
                        'ORDER BY A.SYSTEM_INSTANCE_ID, B.SEQ, A.SERVER_INSTANCE_ID ASC';
            conn.query(sql, (err, row) => {
                conn.release();
                if (err) reject(err);
                resolve(row);
            });
        });
    });
};