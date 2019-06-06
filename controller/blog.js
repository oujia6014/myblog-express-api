const xss = require('xss');
const {exec} = require('../db/mysql')
const getList = (author, keyword) => {
  let sql = `select *from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`
  return exec(sql)
}

const getDetail = (id) => {
  const sql = `select * from blogs where id ='${id}' `
  return exec(sql).then(rows =>{ //返回是数组，处理成返回对象
    return rows[0]
  })
}

const newBlog = (blogData = {}) => {

  const title = blogData.title
  const content = blogData.content
  const author = blogData.author
  const createTime = Date.now()

  const sql = `
    insert into blogs (title, content, createtime, author) values ('${title}', '${content}', '${createTime}' ,'${author}');
    `
  console.error(sql)
  return exec(sql).then(inserDatta =>{
    return {
      id: inserDatta.insertId
    }
  })
}

const updateBlog = (id, blogData = {}) => {

  const title = blogData.title
  const content = blogData.content

  const sql = `
    update blogs set title='${title}', content='${content}' where id='${id}';
    `
  // console.error(sql)
  return exec(sql).then(updateDatta =>{
    if(updateDatta.affectedRows > 0){
      return true
    }
    return false
  })
  // return true
}

const delBlog = (id,author) => {
  const sql = `delete from blogs where id='${id}' and author='${author}';`
  console.error(sql)
  return exec(sql).then(delDatta =>{
    if(delDatta.affectedRows > 0){
      return true
    }
    return false
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
