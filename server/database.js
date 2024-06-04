const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'inventory'
});

pool.getConnection((err, connection) => {
    if (err) {
        console.log(err);
    }
    if (connection) connection.release();

    return;
});

module.exports = pool;