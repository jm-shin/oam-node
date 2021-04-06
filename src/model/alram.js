//database access layer
const mysql = require('mysql');
const mysqlConfig = require('../config/db_info').mysql;

const pool = mysql.createPool(mysqlConfig);

export const getCurrentAlarm = () => {
    return new Promise((resolve, reject) => {
            pool.getConnection((err, conn) => {
                if (err) {
                    conn.release();
                    reject(err);
                };
                const sql = 'SELECT * FROM ALARM LIMIT 3';
                conn.query(sql, (err, rows) => {
                    if (err) reject(err);
                    conn.release();
                    resolve(rows);
                });
            });
    });
};
