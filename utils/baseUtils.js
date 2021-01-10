/*
 * @Description  : 一些常用到的工具函数，封装起来，方便全局使用
 * @Author       : 徫ing
 * @Date         : 2020-09-26 10:56:13
 * @LastEditTime : 2020-10-05 10:46:16
 */

/**
 * 获取当前时间方法,
 * @returns {String} 返回结果格式为2020-10-04 15:26
 */
var getCurentTime = function () {
    var now = new Date();
    var year = now.getFullYear(); //年
    var month = now.getMonth() + 1; //月
    var day = now.getDate(); //日
    var hh = now.getHours(); //时
    var mm = now.getMinutes(); //分
    var clock = year + "-";
    if (month < 10)
        clock += "0";
    clock += month + "-";
    if (day < 10)
        clock += "0";
    clock += day + " ";
    if (hh < 10)
        clock += "0";
    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm;
    return (clock);
}


/**
 * 给URL追加参数
 * @param {String} url
 * @param {String} parameter 参数名
 * @param {String} value  参数值
 * @returns {String} 返回拼接后的字符串
 */
var urlAddParmert = function (url, parameter, value) {
    var buf = new StringBuffer();
    if (!isEmpty(url)) {
        buf.append(url);
        if (url.indexOf("?") > -1) { //已经有参数
            buf.append("&");
        } else {
            buf.append("?");
        }
        buf.append(parameter);
        buf.append("=");
        buf.append(value);
    }
    return buf.toString();
}


/**
 * 验证字符串是否是中文
 * @param {String} source 原字符串
 * @returns {Boolean}
 */
var isChines = function (source) {
    var regex = /^[\u4E00-\u9FA5]+$/;
    return regex.test(source);
}


/**
 * 验证是否为电子邮箱
 * @param {String} source 邮箱名
 * @returns {Boolean}
 */
var isEmail = function (source) {
    var regex = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    if (source.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1) {
        return true;
    } else {
        return false;
    }
}

/**
 * 验证是否为手机号码（移动手机）
 * @param {Number} source
 * @returns {Boolean} 
 */
var isMobilePhone = function (source) {
    var regex = /^((\(\d{3}\))|(\d{3}\-))?1\d{10}/;
    return regex.test(source);
}

/**
 * 验证身份证号是否正确
 * @param {Number} num 身份证号码
 * @returns {Boolean}
 */
var isCardNo = function (num) {
    if (isNaN(num)) {
        alert("输入的身份证号不是数字！");
        return false;
    }
    var len = num.length;
    if (len < 15 || len > 18) {
        alert("输入的身份证号码长度不正确定！应为15位或18位");
        return false;
    }
    var re15 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
    var re18 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;
    var res = (re15.test(num) || re18.test(num));
    if (res == false) {
        alert("输入的身份证号格式不正确！");
        return false;
    }
    return res;
}

/**
 * 判断字符串是否为空，若为空则返回true否则返回false
 * @param {String} source 输入字符串
 * @returns {Boolean} 
 */
var isEmpty = function (source) {
    var str = source.replace(/(^\s*)|(\s*$)/g, "");
    if (str == "" || str.toLowerCase() == "null" || str.length <= 0) {
        return true;
    } else {
        return false;
    }
}

/**
 * 给时间戳转换成自己想要的格式，默认为yyyy-MM-dd HH:mm:ss格式
 * @param {Date} timestamp 时间戳
 * @param {String} format 自定义格式
 */
var format_datetime_ms = function (timestamp, format) {
    var d = new Date(timestamp);

    var fmt = format || 'yyyy-MM-dd HH:mm:ss';
    var o = {
        "M+": d.getMonth() + 1, //月份
        "d+": d.getDate(), //日
        "H+": d.getHours(), //小时
        "m+": d.getMinutes(), //分
        "s+": d.getSeconds() //秒
    };

    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            if (o.hasOwnProperty(k))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

var format_datetime = function (timestamp, format) {
    return format_datetime_ms(timestamp * 1000, format);
}




module.exports = {
    getCurentTime,
    urlAddParmert,
    isChines,
    isEmail,
    isCardNo,
    isEmpty,
    isMobilePhone,
    format_datetime_ms,
    format_datetime
}