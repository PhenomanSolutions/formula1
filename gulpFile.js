var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css');

gulp.task('jsCompile', function () {
    gulp.src([
        'libs/angular/*.js',
        'libs/*.js',
        'app/*.js',
        'app/services/*.js',
        'app/ctrl/*.js',
        'app/directives/*.js',
        'app/models/*.js'
    ])
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('prod/scripts'));
});

//gulp.task('sassCompile', function () {
//    return gulp.src('styles/*.scss')
//        .pipe(sass().on('error', sass.logError))
//        .pipe(gulp.dest('compiled/css'));
//});

//I Have different SCSS compiler

gulp.task('cssCompile', function () {
    gulp.src([
        'css/lib/*.css',
        'css/components/*.css',
        'css/pages/*.css',
        'css/Site.css'
    ])
    .pipe(cleanCSS())
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('prod/styles'));
});