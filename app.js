var createError = require('http-errors');// 404处理
var express = require('express');// 框架
var cookieParser = require('cookie-parser'); // cookie处理
var logger = require('morgan'); // 日志记录
// var path = require('path'); // 本地文件路径

// 引入路由文件
var indexRouter = require('./routes');
var usersRouter = require('./routes/users');


// 单次link 单例 实例
var app = express();

// 日志输出
app.use(logger('dev'));

// 数据兼容, 解析
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// 使用cookie
app.use(cookieParser());

// 注册路由
app.use('/', indexRouter);
app.use('/users', usersRouter);

// 没注册的路由返回404
app.use(function (req, res, next) {
    next(createError(404));
});

// 故障处理
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'dev' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
