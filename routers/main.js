//后台路由管理

var express = require('express');
//创建路由，监听以/admin开头的url
var router = express.Router();

//处理请求/user,表示/admin/user
router.get('/', function (req, res, next) {
    // res.send('首页');
    console.log(typeof JSON.stringify(req.cookies.userInfo));
    res.render('main/index', { //这里的第二个参数就是使用模板，往页面传参数
        userInfo : req.userInfo
    });
});

//为了可以被require引用，必须导出模块
module.exports = router;