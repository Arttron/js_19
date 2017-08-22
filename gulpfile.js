'use strict';
/* Настроен под проэкт ДЗ 7-8 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var rm = require( 'gulp-rm' );
var rigger = require('gulp-rigger');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        open: false
    });
});
gulp.task('bs-reload',['bundleHtml','sass','bundleJs'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('css-concat',['sass'], function () {
    return gulp.src('./src/sass/*.css')
        //.pipe(rigger())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('dist/css'));
});
gulp.task('sass', function () {
    return gulp.src('./src/sass/*.scss')
        //.pipe(rigger())
        .pipe(sass({outputStyle: 'expanded'})
            .on('error', sass.logError))
        .pipe(gulp.dest('./src/sass/'));
});

gulp.task( 'clean', function() {
    return gulp.src( 'dist/**', { read: false })
        .pipe( rm() )
});

gulp.task('imgMin', () =>
        gulp.src('src/img/**')
            .pipe(gulp.dest('dist/img'))
);

gulp.task('bundleHtml', function () {
    return gulp.src('src/html/index.html')
        .pipe(rigger())
        .pipe(gulp.dest('dist/'));
});

gulp.task('bundleJs', () => {
    return gulp.src('src/js/script.js')
		.pipe(rigger())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/js'));
});
gulp.task('JsMod', () => {
    return gulp.src('src/js-mod/*.*')
        .pipe(gulp.dest('dist/js'));
});
gulp.task('copyFont', () => {
    return gulp.src('src/fonts/*.*')
        .pipe(gulp.dest('dist/fonts'));
});
gulp.task('watch',['imgMin','JsMod','copyFont','bundleHtml','css-concat','bundleJs', 'browser-sync'], function () {
    gulp.watch('./src/html/*.html', ['bs-reload']);
    gulp.watch('./src/sass/*.scss', ['css-concat']);
    gulp.watch('./src/sass/*.css', ['bs-reload']);
    gulp.watch('./src/js/*.js', ['bs-reload']);
});
gulp.task('runBuild',['clean'], function () {
	gulp.run('watch');
});
gulp.task('default', ['runBuild']);