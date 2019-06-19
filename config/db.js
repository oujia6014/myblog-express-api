const env = process.env.NODE_ENV
// const mysql = require('mysql')

let MYSQL_CONF;
let REDIS_CONF;
if (env === 'dev') {
    MYSQL_CONF = {
        host: '127.0.0.1',
        user: 'root',
        password: '123456',
        prot: '3306',
        database: 'myBlog'
    }
    REDIS_CONF = {
        prot:6379,
        host: '127.0.0.1',
    }
}
if (env === 'production') {
    MYSQL_CONF = {
        host: '127.0.0.1',
        user: 'root',
        password: '123456',
        prot: '3306',
        database: 'myBlog'
    }
    REDIS_CONF = {
        prot:6379,
        host: '127.0.0.1',
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}
