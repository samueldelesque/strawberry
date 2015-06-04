"use strict";

var watchify = require("watchify");
var uglify = require("gulp-uglify");
var browserify = require("browserify");
var gulp = require("gulp");
var source = require("vinyl-source-stream");
var rename = require("gulp-rename");
var buffer = require("vinyl-buffer");
var gutil = require("gulp-util");
var sourcemaps = require("gulp-sourcemaps");
var assign = require("lodash.assign");
// var less = require('gulp-less');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');

var env = gutil.env && gutil.env.env?gutil.env.env:"dev";

var customOpts = {
  entries: ["./public/src/js/index.js"],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

console.log("");
console.log("For prod, add `gulp --env=prod`. Current env: ",env)
console.log("");

gulp.task('sass', function () {
	return gulp.src('./public/src/sass/index.scss')
		// .pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sass({errLogToConsole:true}).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe((env=="prod")?cssmin():gutil.noop())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./public/dist/css/'));
});
gulp.task("html",function(){
	return gulp.src('./public/src/html/**/*.html')
		.pipe(gulp.dest('./public/dist/'))
});
gulp.task("settings",function(){
	return gulp.src('./public/src/js/settings.'+env+'.js')
		.pipe(rename("js/settings.js"))
		.pipe(gulp.dest('./public/dist'))
});
gulp.task("fonts",function(){
	return gulp.src('./public/src/fonts/**/*')
		.pipe(gulp.dest('./public/dist/fonts'))
});
gulp.task("img",function(){
	return gulp.src('./public/src/img/**/*')
		.pipe(gulp.dest('./public/dist/img'))
});
gulp.task("js", bundle);
b.on("update", bundle);
b.on("log", gutil.log);

function bundle() {
	return b.bundle()
		.on("error", gutil.log.bind(gutil, "Browserify Error"))
		.pipe(source("app.js"))
		.pipe(buffer())
		// .pipe((env=="prod")?uglify():gutil.noop())
		// .pipe((env!=="prod")?sourcemaps.init({loadMaps: true}):gutil.noop())
		// .pipe((env!=="prod"?)sourcemaps.write("./"):gutil.noop())
		.pipe(gulp.dest("./public/dist/js"));
}

gulp.task("watch", function() {
	gulp.watch("./public/src/html/**/*.html", ["html"])
	// gulp.watch("./public/src/less/**/*.less", ["less"])
	gulp.watch("./public/src/sass/**/*.scss", ["sass"])
	gulp.watch("./public/src/fonts/**/*", ["fonts"])
	gulp.watch("./public/src/img/**/*", ["img"])
});

gulp.task("default",["html","sass","fonts","img","watch","js","settings"])