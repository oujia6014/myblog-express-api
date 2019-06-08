const mysql = require('mysql');
const {MYSQL_CONF} = require('../config/db')

//创建链接mysql
const con = mysql.createConnection(MYSQL_CONF)

//开始链接
con.connect()

//执行sql语句函数
function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
    return promise
}

module.exports = {
    exec
}
