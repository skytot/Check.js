/*!
 * Check.tool v1.0.0
 * 超轻量JavaScript 字符串正则验证工具。完全无依赖。
 * 
 * Copyright (c) 2018 skytot <skytot@163.com>
 * https://github.com/skytot/Check.js
 * 
 * Licensed under the MIT license.
 */
!(function(f) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f();
    } else if (typeof define === "function" && define.amd) {
        define([], f);
    } else {
        var g;
        if (typeof window !== "undefined") {
            g = window;
        } else if (typeof global !== "undefined") {
            g = global;
        } else if (typeof self !== "undefined") {
            g = self;
        } else {
            g = this;
        }
        g.Check = f();
    }
})(function() {
    // 默认输出
    var define, module, exports;
    // 正则规则
    var regexs = {
        // 为空
        empty: /^\s*$/,
        // 含空格
        space: /\s+/,
        // 数字
        numericRegex: /^[0-9]+$/,
        /**
         * @descrition:邮箱规则
         * 1.邮箱以a-z、A-Z、0-9开头，最小长度为1.
         * 2.如果左侧部分包含-、_、.则这些特殊符号的前面必须包一位数字或字母。
         * 3.@符号是必填项
         * 4.右则部分可分为两部分，第一部分为邮件提供商域名地址，第二部分为域名后缀，现已知的最短为2位。最长的为6为。
         * 5.邮件提供商域可以包含特殊字符-、_、.
         */
        email: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
        /**
         * [ip ipv4、ipv6]
         * "192.168.0.0"
         * "192.168.2.3.1.1"
         * "235.168.2.1"
         * "192.168.254.10"
         * "192.168.254.10.1.1"
         */
        ip: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])((\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}|(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){5})$/,
        /**
         * @descrition:判断输入的参数是否是个合格的固定电话号码。
         * 待验证的固定电话号码。
         * 国家代码(2到3位)-区号(2到3位)-电话号码(7到8位)-分机号(3位)
         **/
        fax: /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/,
        /**
         *@descrition:手机号码段规则
         * 13段：130、131、132、133、134、135、136、137、138、139
         * 14段：145、147
         * 15段：150、151、152、153、155、156、157、158、159
         * 17段：170、176、177、178
         * 18段：180、181、182、183、184、185、186、187、188、189
         * 国际码 如：中国(+86)
         */
        phone: /^((\+?[0-9]{1,4})|(\(\+86\)))?(13[0-9]|14[59]|15[0-9]|16[56]|17[0-9]|18[0-9]|18[89])\d{8}$/,
        /**
         * @descrition 匹配 URL
         */
        url: /[a-zA-z]+:\/\/[^\s]/,
        money: /^(0|[1-9]\d*)(\.\d+)?$/,
        english: /^[A-Za-z]+$/,
        chinese: /^[\u0391-\uFFE5]+$/,
        percent: /^(?:[1-9][0-9]?|100)(?:\.[0-9]{1,2})?$/
    };
    // 验证策略
    var rule = {
        // 空验证
        is_empty: function(field) {
            return regexs.empty.test(checkVal(field));
        },
        // 包含空格
        is_space: function(field) {
            return regexs.space.test(checkVal(field));
        },
        // 验证合法邮箱
        is_email: function(field) {
            return regexs.email.test(checkVal(field));
        },
        // 验证合法 ip 地址
        is_ip: function(field) {
            return regexs.ip.test(checkVal(field));
        },
        // 验证传真
        is_fax: function(field) {
            return regexs.fax.test(checkVal(field));
        },
        // 验证座机
        is_tel: function(field) {
            return regexs.fax.test(checkVal(field));
        },
        // 验证手机
        is_phone: function(field) {
            return regexs.phone.test(checkVal(field));
        },
        // 验证URL
        is_url: function(field) {
            return regexs.url.test(checkVal(field));
        },
        // 验证金钱
        is_money: function(field) {
            return regexs.money.test(checkVal(field));
        },
        // 验证是否英文
        is_english: function(field) {
            return regexs.english.test(checkVal(field));
        },
        // 验证是否中文
        is_chinese: function(field) {
            return regexs.chinese.test(checkVal(field));
        },
        // 验证是否百分比
        is_percent: function(field) {
            return regexs.percent.test(checkVal(field));
        },
        max_length: function(field, length) {
            if (!regexs.numericRegex.test(length)) return false;
            return checkVal(field).length <= parseInt(length, 10);
        },
        // 最小长度
        min_length: function(field, length) {
            if (!regexs.numericRegex.test(length)) return false;
            return checkVal(field).length >= parseInt(length, 10);
        },
        // 指定字段内容是否相同
        same: function(field, newField) {
            var value1 = checkVal(field);
            var value2 = checkVal(this.fields[newField].element);
            return value1 == value2;
        },
        // 拒绝与某个字段相等,比如登录密码与交易密码情况
        different: function(field, newField) {
            return !this.same(field, newField);
        },
        // 直接判断字符串是否相等
        contains: function(field, value) {
            var value1 = checkVal(field);
            return value1 == value;
        }
    };

    // 赋值函数
    var Check = function() {
        // 将验证方法绑到 Check
        for (var a in rule) this[camelCase(a)] = rule[a];
    };
    // 统一处理函数
    /**
     * [camelCase 字符转换驼峰。]
     * @param  {[type]} string [字符串]
     * @return {[type]}        [字符串]
     */
    function camelCase(string) {
        // Support: IE9-11+
        return string.replace(/\_([a-z])/g, function(all, letter) {
            return letter.toUpperCase();
        });
    }
    /**
     * [checkVal 判断参数是否为字符串 ]
     * @param  {[type]}              [Object or String]
     * @return {[type]}              [String]
     */

    function checkVal(field) {
        return typeof field === "string" ? field : field.value;
    }
    return Check;
});
