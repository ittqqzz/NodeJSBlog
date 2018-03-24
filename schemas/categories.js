//用户数据管理模块
//数据库表存储结构
var mongoose = require('mongoose');
//暴露分类的表结构
module.exports = new mongoose.Schema({
    //分类名称
    name : String
});

