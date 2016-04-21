'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var ejs = require("gulp-ejs");
var gutil = require('gulp-util');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var uglifycss = require('gulp-uglifycss');
var htmlmin = require('gulp-htmlmin');

gulp.task('imagemin', function () {
	return gulp.src('src/img/*')
		.pipe(imagemin({
			progressive: true,
			use: [pngquant()]
		}))
		.pipe(gulp.dest('dist/img'));
});

gulp.task('sass', function () {
	return gulp.src('./src/blocks/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(uglifycss({
			"maxLineLen": 80,
			"uglyComments": true
		}))
		.pipe(gulp.dest('./dist/blocks'));
});


gulp.task('ejs', function () {
	return gulp.src('./src/blocks/**/*.html')
		.pipe(ejs({}).on('error', gutil.log))
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('./dist/blocks'));
});


gulp.task('watch', function () {
	gulp.watch('./src/**/*.scss', ['sass']);
	gulp.watch('./src/**/*.html', ['ejs']);
});

gulp.task('build', ['sass', 'ejs', 'imagemin']);