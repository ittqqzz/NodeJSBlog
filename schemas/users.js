//用户数据管理模块
//数据库表存储结构
var mongoose = require('mongoose');

//暴露用户的表结构
module.exports = new mongoose.Schema({
    //用户名
    username : String,
    //密码
    password : String
});

