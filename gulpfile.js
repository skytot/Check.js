var gulp = require("gulp");
var gutil = require("gulp-util");
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var composer = require("gulp-uglify/composer");
//错误提示
gulp.on("error", function(err) {
    console.log(err);
});
// 压缩js
gulp.task("js:min", function() {
    return gulp
        .src(["./dist/Check.js"])
        .pipe(uglify({}))
        .on("error", function(err) {
            gutil.log(gutil.colors.red("[Error]"), err.toString());
        })
        .pipe(rename('Check.min.js'))
        .pipe(gulp.dest("./dist"));
});

gulp.task("dev", ["js:min"]);
 //定义一个默认任务
gulp.task("default", ["dev"]);