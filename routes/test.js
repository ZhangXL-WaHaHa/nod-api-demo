/*
 * @Description  : 路由设置，这个文件对应配置的是api/test这个文件夹，投医给这个文件夹下面的所有函数分配一个接口
 * @Author       : 徫ing
 * @Date         : 2020-09-26 11:18:14
 * @LastEditTime : 2020-10-05 10:44:14
 */
var express = require('express');
var test = express.Router();

var testApi = require('@/api/test/testAPI');
var testApi_2 = require('@/api/test/testAPI_2');

test.post('/test1', testApi.test1);
test.post('/test2', testApi.test2);
test.post('/test3', testApi_2.test3);
test.post('/test4', testApi_2.test4);

module.exports = test;