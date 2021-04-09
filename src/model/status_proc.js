const dbConfig = require('../config/db_info').mysql;
const pool = require('mysql').createPool(dbConfig);

export const selectAll = () => {
    return new Promise((resolve, reject) => {
       pool.getConnection((err, conn) => {
          if (err) {
              conn.release();
              reject(err);
          }
          const sql = 'SELECT SYSTEM_INSTANCE_ID, SERVER_INSTANCE_ID, VALID, PID, PPID, NAME, ALIAS, TYPE\n' +
              '    FROM STATUS_PROC\n' +
              '    WHERE DATECREATED > DATE_ADD(NOW(), INTERVAL -40 SECOND)\n' +
              '    ORDER BY SYSTEM_INSTANCE_ID, SERVER_INSTANCE_ID, TYPE, IDX ASC';

          conn.query(sql, (err, rows) => {
              conn.release();
              if (err) reject(err);
              resolve(rows);
          });
       });
    });
};