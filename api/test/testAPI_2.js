/*
 * @Description  : 采用封装好的操作方法，直接就可以操作数据库
 * @Author       : 徫ing
 * @Date         : 2020-10-04 17:51:58
 * @LastEditTime : 2020-10-05 10:53:12
 */
var baseApi = require('@/api/baseApi');

// 导入url模块
var url = require('url');

var test3 = function (req, res) {
    var sql = "SELECT * FROM EMPLOYEE";
    baseApi.baseApi(res, sql, "查询成功", "查询失败");
}

var test4 = function (req, res) {
    var params = url.parse(req.url, true).query; //对前端请求的URL进行解析，获得URL里面的参数
    console.log(params)
    var sql = "SELECT * FROM EMPLOYEE WHERE EMP_SEX = " + params.emp_sex;
    baseApi.baseApi(res, sql, "查询成功", "查询失败");
}

module.exports = {
    test3,test4
};