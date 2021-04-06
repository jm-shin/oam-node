const dbConfig = require('../config/db_info').mysql;
const pool = require('mysql').createPool(dbConfig);

export const getServerInfo = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
           if (err) {
               conn.release();
               reject(err);
           }
           const sql = 'SELECT * FROM GV_SERVER_INFO';
           conn.query(sql, (err, rows) => {
               conn.release();
               if (err) reject(err);
               resolve(rows);
           });
        });
    });
};

