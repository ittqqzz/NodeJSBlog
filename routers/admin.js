//后台路由管理

var express = require('express');
//创建路由，监听以/admin开头的url
var router = express.Router();

//处理请求/user,表示/admin/user
router.get('/user', function (req, res, next) {
    res.send('admin user');
});

//为了可以被require引用，必须导出模块
module.exports = router;