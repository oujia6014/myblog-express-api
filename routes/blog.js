var express = require('express');
var router = express.Router();
const {getList, getDetail, newBlog, updateBlog, delBlog} = require('../controller/blog');

router.get('/list', function (req, res, next) {
    let author = req.query.author || '';
    const keywork = req.query.keywork || '';

    if (req.query.isadmin) {
        if (req.session.username == null) {
            res.json('未登陆')
            return
        }
        author = req.session.username
    }

    const result = getList(author, keywork);
    return result.then(listdata => {
        res.json({
            data: JSON.parse(JSON.stringify(listdata))
        })
    })
});

router.get('/detail', function (req, res, next) {
    res.json({
        arr: [5, 6, 7, 8],
        state: 'detail'
    })
});
module.exports = router;
