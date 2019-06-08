var express = require('express');
var router = express.Router();
const {loginCheck} = require('../controller/user')

router.post('/login', function (req, res, next) {
    const {username, password} = req.body
    const result = loginCheck(username, password)
    return result.then((data) => {
        if (data.username) {
            req.session.username = data.username;
            req.session.realname = data.realname;
            data.session = req.session
            res.json({
                data: data
            })
        } else {
            res.json({
                data:'登录失败'
            })
        }
    })
});

router.get('/session', function (req, res, next) {
    const session = req.session;
    res.json({
        session: session
    })
});

module.exports = router;
