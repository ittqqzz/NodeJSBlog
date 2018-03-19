/**
 * 应用程序入口文件
 */
//加载express模块
var express = require('express');
//为了前后端分离，需要加载模板
var swig = require('swig');
//创建app应用
var app = express(); // 等价于===>http.createServer()
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
//监听http请求
app.listen(8081);
//关闭模板缓存
swig.setDefaults({cache:false});
/**
 * 路由绑定
 */

//首页
app.get('/', function (req, res, next) {
    /**
     *读取views目录下的指定文件，解析并返回给客户端
     * 模板引擎一旦解析了某个文件后，会将其保存在内存里面，
     *      便于下一次被访问，而不是再从文件里面加载一次，
     *      开发过程中需要关闭这个功能，解决办法：使用
     *       swig.setDefaults({cache:false});
     * 第一个参数：表示模板的文件，相对于views目录：views/index.html
     * 第二个参数：传递给模板使用的数据
     * */
    res.render('index');
});