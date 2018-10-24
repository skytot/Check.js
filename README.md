<div align=center><img  src="http://or9pbx09t.bkt.clouddn.com/check.png"/></div>

**Check.js**
============================================================
 [![CircleCI](https://circleci.com/gh/jaywcjlove/validator.js.svg?style=svg)]
 
 超轻量级JavaScript字符串正则验证工具。
# 如何开始/To start

在应用中引用 `Check.min.js` 文件, 手动下载并链接HTML中的 [Check.min.js]

```html
<script type="text/javascript" src="dist/Check.min.js"></script>
```

在JS中使用方法。

```html 
<script type="text/javascript">
  var v = new Check();
  v.isSpace('abc sss');
</script>
```

# 包含规则/option

所有规则返回布尔值
- `rules` -> 
    - `isEmpty` -> 非空
    - `isSpace` -> 含空格
    - `isEmail` -> 验证合法邮箱
    - `isIp` -> 验证合法 ip 地址
    - `isFax` -> 验证传真
    - `isTel` -> 验证座机
    - `isPhone` -> 验证手机
    - `isUrl` -> 验证URL
    - `isMoney` -> 金额格式验证
    - `isEnglish` -> 字母验证
    - `isChinese` -> 中文验证
    - `isPercent` -> 验证百分比


# 浏览器支持/ Browser support

Modern browsers and IE 10+.

# 许可证/ License
[MIT](http://opensource.org/licenses/MIT)


# 参考/ Reference

借鉴优秀库:
- [chriso/validator.js](https://github.com/chriso/validator.js)一个字符串验证器和转换类型的库
- [rickharrison/validate.js](https://github.com/rickharrison/validate.js) validate.js是一个轻量级的JavaScript表单验证库灵感来源[CodeIgniter](http://codeigniter.org.cn/user_guide/libraries/form_validation.html)。
