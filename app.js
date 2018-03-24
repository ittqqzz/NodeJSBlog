/**
 * 应用程序入口文件
 */
//加载express模块
var express = require('express');
//为了前后端分离，需要加载模板
var swig = require('swig');
//加载数据库mongoose模块
var mongoose = require('mongoose');
//加载body-parser,用来处理post提交过来的数据
var bodyParser = require('body-parser');
//加载cookies模块
var Cookies = require('cookies');

//解析cookie
var cookieParser = require('cookie-parser');
//创建app应用
var app = express(); // 等价于===>http.createServer()
//引入用户模型
var User = require('./models/User');
/*静态文件托管
	当用户访问的url以/public开始，
	那么直接返回对应的__dirname+'/public'下的文件*/
app.use('/public',express.static(__dirname+'/public'));
//配置swig模板（3步）
/*1.定义当前应用所使用的模板引擎
	第一个参数是模板引擎的名称，也是文件后缀名
	第二个参数是用于解析处理模板内容的方法*/
app.engine('html',swig.renderFile);
/*2.设置模板文件存放的目录
	第一个参数必须是views
	第二个参数是目录*/
app.set('views','./views');
/*3.注册所使用的模板引擎
	第一个参数必须是view engine
	第二个参数与第一步中的第一个参数保持一致*/
app.set('view engine','html');

//关闭模板缓存
swig.setDefaults({cache:false});

//bodyparser设置
app.use(bodyParser.urlencoded({extended:true}));
//设置cookie
app.use(cookieParser());

app.use(function(req,res,next){
    // req.cookies= new Cookies(req,res);
    //解析登录用户的cookie信息
    req.userInfo = {};
    if(req.cookies){
        try{
            req.userInfo = JSON.parse(JSON.stringify(req.cookies.userInfo));
            //获取当前用户的类型，是否是管理员
            User.findById(req.userInfo._id).then(function (userInfo) {
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                next();
            });
            
        }catch(e){
            console.log('cookie验证出错');
            next();
        }
    } else {
        console.log('不存在cookie');
        next();
    }
});
//根据不同功能划分模块（后台、API、前台）
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));


//连接数据库(需要下载安装mongoose)
mongoose.connect('mongodb://localhost:27017/blog', function (err) {
    if (err) {
        console.log('数据库连接失败'+err);
    } else {
        console.log('数据库连接成功');
        //监听http请求
        app.listen(3000);
        console.log('正在监听。。。');
    }
});



