var gulp = require('gulp'),           //Always first in load order
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  browserSync = require('browser-sync'),
  eslint = require('gulp-eslint');

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

gulp.task('watch', function() {
 gulp.watch('./js/*.js', gulp.parallel('script'));
});

gulp.task('browser-sync', function() {
 browserSync.init( {
   server: {
     baseDir: "./"
   }
 })
})

gulp.task('css', function(){
  return gulp.src('style.css')
});

gulp.watch("./build/js/*.js").on('change', browserSync.reload);

gulp.watch("style.css").on('change', browserSync.reload);

gulp.task('default', gulp.parallel('watch', 'browser-sync')); //runs script in parallel