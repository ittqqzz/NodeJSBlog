//后台路由管理

var express = require('express');
//创建路由，监听以/admin开头的url
var router = express.Router();
var Category = require('../models/Category');
var Content = require('../models/Content');

//导航栏通用数据
var data ;
router.use(function(req,res,next){
    data = {
        userInfo : req.userInfo,
        categories : []
    }
    Category.find().then(function (categories) {
        data.categories = categories;
        next();
    });
});

//处理请求/user,表示/admin/user
router.get('/', function (req, res, next) {

     data.category = req.query.category || '';
     data.count = 0;
     data.page = Number(req.query.page || 1);
     data.limit = 5;
     data.pages = 1;
    //获取分类列表
    var where = {};
    if (data.category) {
        where.category = data.category;
    }
    Content.where(where).count().then(function (count) {
        data.count = count;
        data.pages = Math.ceil(data.count / data.limit);
        data.page = Math.min(data.page, data.pages);
        data.pages = Math.max(data.pages, 1);
        var skip = (data.page - 1) * data.limit;
        return Content.where(where).find().limit(data.limit).skip(skip).populate(['category', 'user']).sort({
            addDat : -1
        });
    }).then(function (contents) {
        data.contents = contents;
        res.render('main/index',data);
    });
    
});

//详情页
router.get('/view',function(req,res,next){
    var contentId = req.query.contentid;
    Content.findOne({
        _id : contentId
    }).then(function (content) {
        data.content = content;
        //res.writeHead(200, {'Context-Type' : 'text/html'});
        res.render('main/view', data);
    });
});

//为了可以被require引用，必须导出模块
module.exports = router;