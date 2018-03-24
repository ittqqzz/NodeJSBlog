//后台路由管理

var express = require('express');
//加载获取时间模块
var sd = require('silly-datetime');
//创建路由，监听以/admin开头的url
var router = express.Router();
//调用数据库，引入数据模型
var User = require('../models/User');
var Category = require('../models/Category');
var Content = require('../models/Content');

//先验证是否为管理员操作
// router.use(function (req, res, next) {
//     if (!req.userInfo.isAdmin) {
//         //不是管理员
//         res.send('你不是管理员，退下！');
//         return;
//     }
//     next();
// });

router.get('/', function (req, res, next) {
    res.render('admin/index', {
        userInfo : req.userInfo
    });
});

/**
 * 用户管理
 */
router.get('/user', function (req,res) {
    //
    /**
     * 从数据库中读取全部的用户记录
     * 并限制读取的条数limit()
     *
     * skip()忽略数据的条数，例如：
     * 1:1-2 skip:0
     * 2:3-4 skip:2  --> （当前页-1）*limit
     */
    //获取浏览器传过来的请求页面参数
    var page = Number(req.query.page || 1);
    var limit = 2;

    var pages = 0;
    //User.count()查询记录总条数，结果放到
    User.count().then(function (count) {
        //计算总页数，向上取整
        pages = Math.ceil(count / limit);
        //在page, pages取最小值
        page = Math.min(page, pages);
        //取值不能小于1
        page = Math.max(page, 1);

        var skip = (page - 1) * limit;

        User.find().limit(limit).skip(skip).then(function (users) {
            res.render('admin/user_index', {
                userInfo : req.userInfo,
                users : users,
                page : page,
                count : count,
                pages : pages,
                limit : limit,
                pageType : 'user'
            });
        });
    });
});

/**
 * 分类首页
 */
router.get('/category',function(req,res,next){
    // var page= Number(req.query.page || 1);
    // var limit=10;
    // var pages=0;
    //
    // //计算总页数
    // var count=categories.length;
    // pages=Math.ceil(count/limit);
    // //取值
    // page=Math.min(page,pages);
    // page=Math.max(page,1);
    var page = Number(req.query.page || 1);
    var limit = 2;

    var pages = 0;
    //User.count()查询记录总条数，结果放到
    Category.count().then(function (count) {
        //计算总页数，向上取整
        pages = Math.ceil(count / limit);
        //在page, pages取最小值
        page = Math.min(page, pages);
        //取值不能小于1
        page = Math.max(page, 1);

        var skip = (page - 1) * limit;

        /**
         * 排序 sort（）
         * 参数
         *  1:升序
         *  -1：降序
         */
        Category.find().sort({_id:-1}).limit(limit).skip(skip).then(function (categories) {
            res.render('admin/category_index', {
                userInfo : req.userInfo,
                categories : categories,
                page : page,
                count : count,
                pages : pages,
                limit : limit,
                pageType : 'category'
            });
        });
    });

});

//分类添加
router.get('/category/add',function(req,res,next){
    res.render('admin/category_add',{
        userInfo :req.userInfo
    });
});

//分类保存
router.post('/category/add',function(req,res,next) {
    var name = req.body.name || '';

    if (name == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '名称不能为空'
        });
        return false;
    } else {
        //查询数据库中是否存在该分类
        Category.findOne({
            name: name
        }).then(function (rs) {
            if (rs) {
                //rs存在，则数据库中已存在改分类
                res.render('admin/error', {
                    userInfo: req.userInfo,
                    message: '分类已经存在'
                });
                return Promise.reject();
            } else {
                return new Category({
                    name: name
                }).save();
            }
        }).then(function (newCategory) {
            res.render('admin/success', {
                userInfo: req.userInfo,
                message: '分类保存成功',
                url: '/admin/category'
            });
        });
    }
});

//分类编辑
router.get('/category/edit',function(req,res,next){
    var id = req.query.id || '';
    Category.findOne({
        _id : id
    }).then(function (category) {
        res.render('admin/category_edit',{
            userInfo : req.userInfo,
            category: category
        });
    });
});

//分类编辑保存
router.post('/category/edit',function(req,res,next){
    var name = req.body.name || '';
    var id = req.query.id || '';
    Category.findOne({
       _id : id
    }).then(function (category) {
        if (!category) {
            res.render('admin/error',{
                userInfo:req.userInfo,
                message:'分类信息不存在'
            });
            return Promise.reject();
        } else {
            if (name == category.name) {
                res.render('admin/success',{
                    userInfo:req.userInfo,
                    message:'修改成功',
                    url : '/admin/category'
                });
                return Promise.reject();
            } else {
                return Category.findOne({
                    _id : {$ne: id},
                    name : name
                });
            }
        }
    }).then(function (sameCategory) {
        if (sameCategory) {
            res.render('admin/error',{
                userInfo:req.userInfo,
                message:'数据库中存在相同分类'
            });
            return Promise.reject();
        } else {
            return Category.update({
                _id : id//不变的值
            }, {
                name : name//要修改的值
            });
        }
    }).then(function (value) {
        res.render('admin/success',{
            userInfo:req.userInfo,
            message:'修改成功',
            url : '/admin/category'
        });
    });
});

// //分类删除
router.get('/category/delete',function(req,res,next){
    //获取要删除的分类ID
    var id = req.query.id || '';

    Category.remove({
        _id : id
    }).then(function () {
        res.render('admin/success',{
            userInfo:req.userInfo,
            message:'删除成功',
            url:'/admin/category'
        });
    });
});

/**
 * 内容管理
 */
//内容管理首页
router.get('/content',function(req,res,next){
    //res.render('admin/content_index');

    var page = Number(req.query.page || 1);
    var limit = 2;

    var pages = 0;
    //User.count()查询记录总条数，结果放到
    Content.count().then(function (count) {
        //计算总页数，向上取整
        pages = Math.ceil(count / limit);
        //在page, pages取最小值
        page = Math.min(page, pages);
        //取值不能小于1
        page = Math.max(page, 1);

        var skip = (page - 1) * limit;

        /**
         * 排序 sort（）
         * 参数
         *  1:升序
         *  -1：降序
         *
         *  populate():同时查询关联字段
         */

        Content.find().sort({_id:-1}).limit(limit).skip(skip).populate('category').then(function (contents) {

            res.render('admin/content_index', {
                userInfo : req.userInfo,
                contents : contents,
                page : page,
                count : count,
                pages : pages,
                limit : limit,
                pageType : 'content'
            });
        });
    });

});

//内容添加
router.get('/content/add',function(req,res,next){
    //获取分类列表，显示在内容添加页面
    Category.find().sort({_id : -1}).then(function (categories) {
        res.render('admin/content_add',{
            userInfo:req.userInfo,
            categories:categories
        });
    });
});

//内容添加保存
router.post('/content/add',function(req,res){
    var category = req.body.category ||'';
    var title = req.body.title ||'';
    var author = req.body.author ||'';
    var description = req.body.description ||'';
    var content = req.body.content ||'';
    if(category=='' || title=='' || description=='' || /*content=='' ||*/ author==''){
        res.render('admin/error',{
            userInfo:req.userInfo,
            message:'所有框内输入不能为空'
        });
    } else {
        var addDate = sd.format(new Date(), 'YYYY-MM-DD HH:mm');
        new Content({
            category : category,
            title : title,
            description :description,
            content : content,
            author : author,
            addDat : addDate,
            views : '0'
        }).save().then(function () {
            res.render('admin/success',{
                userInfo:req.userInfo,
                message:'内容添加成功',
                url:'/admin/content'
            });
        });
    }
});

//内容修改
router.get('/content/edit',function(req,res){
    var id = req.query.id || '';

    var categories = [];

    //获取分类列表，显示在内容添加页面
    Category.find().sort({_id : -1}).then(function (rs) {
        categories = rs;
        return Content.findOne({
            _id : id
        }).populate('category');
    }).then(function (content) {
        console.log('content: '+content);
        console.log('categories: '+categories);
        if (!content) {
            res.render('admin/error',{
                userInfo:req.userInfo,
                message:'指定信息不存在'
            });
            return Promise.reject();
        } else {
            res.render('admin/content_edit',{
                userInfo: req.userInfo,
                categories : categories,
                Content : content
                /**
                 * 当我把
                 * categories : categories,
                 * Content : content
                 * 这两行交换位置以后，就异常了
                 */
            });
        }
    });;
});

//内容修改保存
router.post('/content/edit',function(req,res){
    var id= req.query.id || '';
    var category = req.body.category ||'';
    var title = req.body.title ||'';
    var author = req.body.author ||'';
    var description = req.body.description ||'';
    var content = req.body.content ||'';

    if(category =='' || title=='' || description=='' || content=='' || author==''){
        res.render('admin/error',{
            userInfo:req.userInfo,
            message:'所有框内输入不能为空'
        });
    } else {
        Content.update({
            _id : id//条件
        }, {
            category : category,
            title : title,
            author : author,
            description : description,
            content : content
        }).then(function () {
            res.render('admin/success',{
                userInfo:req.userInfo,
                message:'内容修改成功',
                url:'/admin/content'
            });
        });
    }
});

//内容删除
router.get('/content/delete',function(req,res,next){
    //获取要删除的分类ID
    var id = req.query.id || '';
    Content.remove({
        _id : id
    }).then(function () {
        res.render('admin/success',{
            userInfo:req.userInfo,
            message:'删除成功',
            url:'/admin/content'
        });
    });
});
//为了可以被require引用，必须导出模块
module.exports = router;