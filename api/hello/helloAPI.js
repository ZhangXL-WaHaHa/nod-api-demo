/*
 * @Description  : 查询数据
 * @Author       : 徫ing
 * @Date         : 2020-10-04 11:40:33
 * @LastEditTime : 2020-10-05 13:37:10
 */

// 导入url模块
var url = require('url');
// 导入mysql模块 
var mysql = require('mysql');
// 导入数据库配置信息
var dbconfig = require('@/config/DBConfig');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbconfig.mysql);

/**
 * 获取数据库里面所有数据
 * @param {*} req request 请求
 * @param {*} res response 响应
 * @param {*} next 
 */
var hello1 = function (req, res, next) {
    var sql = "SELECT * FROM EMPLOYEE";
    //mysql连接池开始连接，连接数据库
    pool.getConnection(function (err, connection) {
        //执行增删改查的SQL语句，然后获得结果
        connection.query(sql, function (err, results) {
            //返回给请求方，也就是谁请求了，就返回给谁，这里我们返回给的是前端
            res.send({
                "status": 1,
                "data": {
                    results: results
                },
                "msg": ""
            });
        });
        connection.release();
    })
};

/**
 * 根据查询条件来查询数据
 * @param {*} req request 请求
 * @param {*} res response 响应
 * @param {*} next 
 */
var hello2 = function (req, res, next) {
    var params = url.parse(req.url, true).query; //对前端请求的URL进行解析，获得URL里面的参数
    var sql = "SELECT * FROM EMPLOYEE WHERE EMP_SEX = " + params.emp_sex;
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (err, results) {
            // 如果查询的结果不为空，就返回数据
            if (results != [] && results != "") {
                res.send({
                    "status": 1,
                    "data": {
                        results: results
                    },
                    "msg": "查询成功"
                });
            } else {
                res.send({
                    "status": 0,
                    "data": {},
                    "msg": "找不到数据"
                })
            }
        });
        connection.release();
    })
};

module.exports = {
    hello1,
    hello2
};