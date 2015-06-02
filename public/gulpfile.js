"use strict";

var watchify = require("watchify");
var uglify = require("gulp-uglify");
var browserify = require("browserify");
var gulp = require("gulp");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var gutil = require("gulp-util");
var sourcemaps = require("gulp-sourcemaps");
var assign = require("lodash.assign");
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');

// add custom browserify options here
var customOpts = {
  entries: ["./src/js/index.js"],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts)); 

gulp.task("less",function(){
	return gulp.src('./src/less/index.less')
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(less())
		.pipe(cssmin())
		.pipe(gulp.dest('./dist/css'))
});
gulp.task("html",function(){
	return gulp.src('./src/html/**/*.html')
		.pipe(gulp.dest('./dist/'))
});
gulp.task("fonts",function(){
	return gulp.src('./src/fonts/**/*')
		.pipe(gulp.dest('./dist/fonts'))
});
gulp.task("img",function(){
	return gulp.src('./src/img/**/*')
		.pipe(gulp.dest('./dist/img'))
});
gulp.task("js", bundle);
b.on("update", bundle);
b.on("log", gutil.log);

function bundle() {
  return b.bundle()
	.on("error", gutil.log.bind(gutil, "Browserify Error"))
	.pipe(source("app.js"))
	.pipe(buffer())
	// .pipe(uglify())
	.pipe(sourcemaps.init({loadMaps: true}))
	.pipe(sourcemaps.write("./"))
	.pipe(gulp.dest("./dist/js"));
}

gulp.task("watch", function() {
	gulp.watch("./src/html/*.html", ["html"])
	gulp.watch("./src/less/*.less", ["less"])
	gulp.watch("./src/fonts/*", ["fonts"])
	gulp.watch("./src/img/*", ["img"])
});

gulp.task("default",["html","less","fonts","img","watch","js"])