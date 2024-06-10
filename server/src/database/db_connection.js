var typeorm = require('typeorm');

var datasource = new typeorm.DataSource({
    type:'mariadb',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'inventory',
    synchronize: true,
    logging: true,
    entities: [
        require('./entities/booking'), require('./entities/article')
    ]
})


module.exports = datasource;