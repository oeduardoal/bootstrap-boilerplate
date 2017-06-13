var gulp = require('gulp');

// CSS - SCSS
var cssnano = require('gulp-cssnano'),
    sass = require('gulp-sass');

// JS 
var uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  browserify = require("browserify"),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer');

// Task For Compile SCSS
gulp.task('sass', function(){
  var files = [
    'assets/sass/_styles.scss',
    'assets/sass/main.scss',
  ];
    return gulp.src(files)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.min.css'))
    .pipe(cssnano({ zindex: false }))
    .pipe(gulp.dest('dist/css'))
})

gulp.task('js', function(){
 return browserify('assets/js/main.js', {
      debug: false
  })
  .bundle()
  .pipe(source('main.min.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('dist/js/'));
});

gulp.task('default', ['sass', 'js'], function (){
  gulp.watch('assets/sass/*.scss', ['sass']);
  gulp.watch('assets/js/*.js', ['js']);
})
