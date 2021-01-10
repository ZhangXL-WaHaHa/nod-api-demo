var express = require('express');
var hello = express.Router();

var helloApi = require('@/api/hello/helloAPI')

hello.post('/hello1', helloApi.hello1);
hello.post('/hello2', helloApi.hello2);

module.exports = hello;