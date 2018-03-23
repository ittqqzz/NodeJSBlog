//用户数据管理模块
//数据库表存储结构
var mongoose = require('mongoose');

//暴露内容的表结构
module.exports = new mongoose.Schema({
    //关联字段 -- > 内容分类的id
    catedoyr : {
        //类型
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Content'
    },
    title : String,

    description : {
        type : String,
        default : ''
    },

    content: {
        type : Srting,
        default : ''
    }
});

