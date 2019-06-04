var express = require('express');
var router = express.Router();

router.get('/list', function (req, res, next) {
    res.json({
        arr: [1, 2, 3, 4]
    })
});
router.get('/detail', function (req, res, next) {
    res.json({
        arr: [5, 6, 7, 8],
        state: 'detail'
    })
});
module.exports = router;
