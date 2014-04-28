
// Load Plugins

var gulp       = require('gulp'),
    gutil      = require('gulp-util'),
    watch      = require('gulp-watch'),
    jshint     = require('gulp-jshint'),
    sass       = require('gulp-ruby-sass'),
    concat     = require('gulp-concat'),
    minifyCSS  = require('gulp-minify-css'),
    rename     = require('gulp-rename'),
    lr         = require('tiny-lr'),
    server     = lr(),
    livereload = require('gulp-livereload');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function(){
  gulp.src('./sass/i.scss')
      .pipe(watch(function(files) {
        return files.pipe(sass({loadPath: ['./sass/'], style: "compact"}))
          .pipe(gulp.dest('./css/'))
          .pipe(livereload(server));
      }));
});

// Minify CSS
gulp.task('minify-css', function(){
  gulp.src('./css/i.css')
    .pipe(minifyCSS({keepSpecialComments: 0}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./css/'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest('dist'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('./js/*.js', ['lint', 'scripts']);
    gulp.watch('./scss/*.scss', ['sass']);
});

gulp.task('reload-html', function() {
  gulp.src('*.html')
    .pipe(watch(function(files) {
      return files.pipe(livereload(server));
    }));
});

// Default Task
gulp.task('default', function(){
  gulp.run('lint', 'sass', 'scripts', 'watch');
  server.listen(35729, function (err) {
    gulp.watch(['*.html', './sass/*.scss', './js/*.js'], function(event) {
      gulp.run('reload-html','lint', 'sass', 'scripts', 'watch');
    });
  });
});