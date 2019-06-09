moudle.exports = (req, res, next) => {
    if(req.session.username){
        next()
        return
    }
    res.json('未登陆')
}