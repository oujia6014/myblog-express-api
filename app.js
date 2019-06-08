var createError = require('http-errors');// 404处理
var express = require('express');// 框架
var cookieParser = require('cookie-parser'); // cookie处理
var logger = require('morgan'); // 日志记录
// var path = require('path'); // 本地文件路径
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var redisClient = require('./db/redis');

// 引入子路由
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

// 单次link 单例 实例
var app = express();

// 日志输出
app.use(logger('dev'));

// 数据兼容, 解析
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// 使用cookie
app.use(cookieParser());
// //使用session
const sessionStorage = new RedisStore({
    client:redisClient
});
app.use(session({
    secret: 'KEY_#123w', // 秘钥
    cookie: { // 默认
        // path: '/',
        // httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    },
    store: sessionStorage// 讲session存储到redis
}));

// 注册副路由,加载子路由
app.use('/api/blog',blogRouter);
app.use('/api/user',userRouter);

// 没注册的路由返回404
app.use(function (req, res, next) {
    next(createError(404));
});

// 故障处理
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'dev' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
