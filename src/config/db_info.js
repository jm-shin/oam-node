const {HOST, DB_USER, DB_PASSWORD, DATABASE} = process.env;

module.exports = {
    mysql: {
        host: HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DATABASE
    }
};