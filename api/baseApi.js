/*
 * @Description  : 封装操作数据库的代码，因为一些代码高度相似，其他文件要使用这些模块的时候，直接用require导入即可
 * @Author       : 徫ing
 * @Date         : 2020-10-04 17:24:20
 * @LastEditTime : 2020-10-05 10:50:34
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
 * 封装对数据库的增删改查代码，返回的结果code为0表示失败，为1表示成功
 * @param {*} res 服务器的响应，也就是服务器把查询到的数据返回给前端
 * @param {String} sql SQL语句
 * @param {String} querySuccessMsg 操作数据库成功时的提示信息
 * @param {String} queryErrMsg 操作数据库失败时的提示信息
 * @returns {*} 失败就直接返回，成功就返回数据
 */
var baseApi = function (res, sql, querySuccessMsg, queryErrMsg) {
    // 对传入的各类信息进行比较，当没有传入的时候，就默认为'',防止出现出错
    var querySuccessMsg_ = querySuccessMsg || '';
    var queryErrMsg_ = queryErrMsg || '';

    pool.getConnection(function (err, connection) {
        /**
         * 这个错误是数据库连接时抛出的错误,比如MySQL服务未开启、主机错误、密码错误、端口错误、数据库不存在等等，
         * 如果连接的时候出错了，就会返回错误的信息，最好写上，到时候可以排查错误
         * 如果出现错误，那么err这个回调函数就不为null，如果连接正常，就为null
         */
        if (err !== null) {
            res.send({
                "code": 0,
                "data": {
                    err: err
                },
                "msg": "数据库连接错误！请检查数据库服务是否开启、用户名和密码是否正确、主机地址和端口是否正确、数据库存不存在！"
            });
            return;
        }

        // 执行数据库操作语句
        connection.query(sql, function (err, results) {
            /**
             * 这个错误是执行MySQL语句时可能会出现的错误，和上面的道理一样，还是要写上，方便检查错误
             */
            if (err !== null) {
                res.send({
                    "code": 0,
                    "data": {
                        err: err
                    },
                    "msg": "请检查SQL语句是否正确！"
                });
                return;
            }

            if (results != [] && results != "") {
                res.send({
                    "code": 1,
                    "data": {
                        results: results
                    },
                    "msg": querySuccessMsg_
                });
            } else {
                res.send({
                    "code": 0,
                    "data": {
                        results: results,
                        err: err
                    },
                    "msg": queryErrMsg_
                })
            }
        });
        connection.release(); //释放这个连接池
    })
};

module.exports = {
    baseApi
};