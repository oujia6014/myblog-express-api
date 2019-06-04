var express = require('express');
var router = express.Router();

router.post('/login', function (req, res, next) {
    const {username, password} = req.body;
    res.json({
        post: '/login',
        username:username,
        password:Math.floor(Math.random()*1000000)
    })
});
module.exports = router;
