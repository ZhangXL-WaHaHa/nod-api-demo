/*
 * @Description  : 进行一些更新和插入操作
 * @Author       : 徫ing
 * @Date         : 2020-10-04 11:00:22
 * @LastEditTime : 2020-10-05 10:49:22
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
 * 根据指定字段来更新数据库数据
 * @param {*} req request 请求
 * @param {*} res response 响应
 * @param {*} next 
 */

var test1 = function (req, res, next) {
    var params = url.parse(req.url, true).query; //对前端请求的URL进行解析，获得URL里面的参数
    var sql = "UPDATE EMPLOYEE SET EMP_NAME = " + params.emp_name + " WHERE EMP_ID = " + params.emp_id;
    console.log(sql)
    pool.getConnection(function (err, connection) {
        /**
         * 这个错误是数据库连接时抛出的错误,比如MySQL服务未开启、主机错误、密码错误、端口错误、数据库不存在等等，
         * 如果连接的时候出错了，就会返回错误的信息，最好写上，到时候可以排查错误
         * 如果出现错误，那么err这个回调函数就不为null，如果连接正常，就为null
         */
        if (err !== null) {
            res.send({
                "status": 0,
                "data": {
                    err: err
                },
                "msg": "数据库连接错误"
            });
            return;
        }

        connection.query(sql, function (err, results) {
            /**
             * 这个错误是执行MySQL语句时可能会出现的错误，和上面的道理一样，还是要写上，方便检查错误
             */
            if (err !== null) {
                res.send({
                    "status": 0,
                    "data": {
                        err: err
                    },
                    "msg": "更新错误"
                });
                return;
            }

            if (results != [] && results != "") {
                res.send({
                    "status": 1,
                    "data": {
                        results: results,
                        err: err
                    },
                    "msg": "更新成功"
                });
            } else {
                res.send({
                    "status": 0,
                    "data": {
                        results: results
                    },
                    "msg": "更新失败"
                })
            }
        });
        connection.release();
    })
};

/**
 * 插入数据
 * @param {*} req request 请求
 * @param {*} res response 响应
 * @param {*} next 
 */
var test2 = function (req, res, next) {
    var params = url.parse(req.url, true).query; //对前端请求的URL进行解析，获得URL里面的参数
    var sql = "INSERT INTO SYS_ROLE (ROLE_ID,ROLE_CODE, ROLE_NAME) VALUES (" + params.role_id + "," + params.role_code + "," + params.role_name + ")";
    pool.getConnection(function (err, connection) {
        if (err !== null) {
            res.send({
                "status": 0,
                "data": {
                    err: err
                },
                "msg": "数据库连接错误"
            });
            return;
        }

        connection.query(sql, function (err, results) {
            if (err !== null) {
                res.send({
                    "status": 0,
                    "data": {
                        err: err
                    },
                    "msg": "操作数据库错误"
                });
                return;
            }

            // 如果查询的结果不为空，就返回数据
            if (results != [] && results != "") {
                res.send({
                    "status": 1,
                    "data": {
                        results: results
                    },
                    "msg": "插入成功"
                });
            } else {
                res.send({
                    "status": 0,
                    "data": {},
                    "msg": "插入失败"
                })
            }
        });
        connection.release();
    })
};

module.exports = {
    test1,
    test2
};