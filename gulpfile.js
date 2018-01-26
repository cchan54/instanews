var gulp = require('gulp'),           //Always first in load order
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  browserSync = require('browser-sync'),
  eslint = require('gulp-eslint'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cssnano = require('gulp-cssnano');
  prettyError = require('gulp-prettyerror')


gulp.task('sass', function(){
  return gulp.src('./scss/style.scss')
  .pipe(sass())
  .pipe(prettyError())
  .pipe(
    autoprefixer({
      browsers: ['last 2 versions']
    })
  )
  .pipe(gulp.dest('./build/css'))
  .pipe(cssnano())
  .pipe(rename('style.min.css'))
  .pipe(gulp.dest('./build/css'))
});

//script task to minify, rename, and put in build folder

gulp.task('lint', function(){
  return gulp.src(['./js/*.js'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
});  

gulp.task('script', function() {
 return gulp.src('./js/*.js')
   .pipe(uglify())   //calls uglify to run
   .pipe(rename({extname: '.min.js'})) //renames extension to ".min.js"
   .pipe(gulp.dest('./build/js'))
});

//gulp watch tasks
gulp.task('watch', function() {
 gulp.watch('./scss/*.scss', gulp.series('sass'));
 gulp.watch('./js/*.js', gulp.series('script'));
});

//gulp browser sync task
gulp.task('browser-sync', function() {
 browserSync.init( {
   server: {
     baseDir: "./"
   }
 });

  gulp.watch(['*.html', './build/css/*.css','./build/js/*.min.js']).on('change', browserSync.reload)
})

//default function that can reference multiple named tasks
gulp.task('default', gulp.parallel('watch', 'browser-sync')); //runs script in parallel