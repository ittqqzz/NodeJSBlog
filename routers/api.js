//后台路由管理

var express = require('express');
//创建路由，监听以/admin开头的url
var router = express.Router();
//引入数据模板
var User = require('../models/User');

var Content = require('../models/Content');

//统一数据返回格式
var responseData;
router.use(function (req, res, next) {
    responseData = {
        code: 0,//默认0表示无错误
        message: '',
    }
    next();
});
/**
 * 用户注册
 * 注册逻辑
 *  1、用户名、密码不能为空
 *  2、两次输入密码必须一致
 *  3、用户名是否已经被注册（数据库）
 */
router.post('/user/register', function (req, res, next) {
    var username = req.body.username;
    var pwd = req.body.pwd;
    var repwd = req.body.repwd;
    if (username == '') {
        responseData.code = 1;
        responseData.message = '用户名不能为空';
        res.json(responseData);
        return;
    }
    if (pwd == '') {
        responseData.code = 1;
        responseData.message = '密码不能为空';
        res.json(responseData);
        return;
    }
    if (pwd != repwd) {
        responseData.code = 1;
        responseData.message = '两次输入的密码不同';
        res.json(responseData);
        return;
    }
    //注册数据库检查，检查用户名是否已经存在
    User.findOne({
        username : username
    }).then(function (userInfo) {
        if (userInfo) {
            //数据库中存在记录
            responseData.code = 4;
            responseData.message = '用户名已经被注册了';
            res.json(responseData);
            return;
        }
        var user = new User({
            username : username,
            password : pwd
        });
        return user.save();

    }).then(function (newUserInfo) {
        responseData.message = '注册成功';
        res.json(responseData);
        return ;
    });
});
/*用户登录
	登录逻辑
	查找数据库用户名和密码一致则登录成功*/
router.post('/user/login',function(req,res){
    var username = req.body.username;
    var pwd= req.body.pwd;

    if(username == '' || pwd == ''){
        responseData.code=1;
        responseData.message='用户名和密码不能为空';
        res.json(responseData);
        return;
    }
    //查询数据库中相同用户名和密码的记录是否存在，存在则登录成功
    User.findOne({
        username : username,
        password : pwd
    }).then(function (userInfo) {
        if (!userInfo) {
            responseData.message = '用户名或密码错误';
            responseData.code = 2;
            res.json(responseData);
            return ;
        }
        responseData.message = '登录成功';
        //往前端返回数据
        responseData.userInfo = {
            _id : userInfo._id,
            username: userInfo.username
        };
        res.cookie('userInfo', {
            _id : userInfo._id,
            username: userInfo.username
        }, {maxAge: 40000});
        res.json(responseData);
        return;
    });
});

/*退出
*/
router.get('/user/logout',function(req,res){
    res.cookie('userInfo', null, {maxAge: 0});
    responseData.message = '注销成功';
    res.json(responseData);
});

/*指定文章的全部评论
*/
router.get('/comment',function(req,res){
    var contentId = req.query.contentid || '';
    Content.findOne({
        _id : contentId
    }).then(function (content) {
        responseData.data = content.comments;
        res.json(responseData);

    });
});

/*评论提交
*/
router.post('/comment/post',function(req,res){

   var contentId = req.body.contentid || '';
   var postData = {
       username : req.userInfo.username,
       postTime : new Date(),
       content : req.body.comment
   }
    Content.findOne({
        _id : contentId
    }).then(function (content) {
        content.comments.push(postData);
        return content.save();
    }).then(function (newContent) {
        responseData.message = '评论成功';
        responseData.data = newContent;
        res.json(responseData);
    });
});
//为了可以被require引用，必须导出模块
module.exports = router;