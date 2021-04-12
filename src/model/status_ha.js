const dbConfig = require('../config/db_info').mysql;
const pool =require('mysql').createPool(dbConfig);

export const selectAll = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
           if (err) {
               conn.release();
               reject(err);
           };

           const sql = 'SELECT SYSTEM_INSTANCE_ID, SERVER_INSTANCE_ID, HBTSTATUS, MANDATORY_FLAG, IP, NAME, \n' +
                        'INFINITE_LOOP_ENABLE, INFINITE_LOOP_RECHECKNUM, INFINITE_LOOP_RECHCKDUR, \n' +
                        'PROC_RECHECKNUM, PROC_RECHECKDUR \n' +
                        'FROM STATUS_HA\n' +
                        'WHERE DATECREATED > DATE_ADD(NOW(), INTERVAL -20 SECOND)\n' +
                        'ORDER BY SYSTEM_INSTANCE_ID, SERVER_INSTANCE_ID ASC';

           conn.query(sql, (err, rows) => {
              conn.release();
              if (err) reject(err);
              resolve(rows);
           });
        });
    });
};