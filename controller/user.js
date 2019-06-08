const {exec} = require('../db/mysql')

const loginCheck = (username, password) => {
  // username = escape(username)
  // password = escape(password)
  const sql = `select username, realname from users where username='${username}' and password='${password}';`
  console.error('==== sql: ',sql)
  return exec(sql).then((rows)=>{
    return rows[0] || {}
  })
}

module.exports = {
  loginCheck
}
