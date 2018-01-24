var gulp = require('gulp'),           //Always first in load order
 uglify = require('gulp-uglify'),
 rename = require('gulp-rename'),
 browserSync = require('browser-sync');


gulp.task('script', function() {
 return gulp.src('./js/*.js')
   .pipe(uglify())   //calls uglify to run
   .pipe(rename({extname: '.min.js'})) //renames extension to ".min.js"
   .pipe(gulp.dest('./build/js'))
});

gulp.task('css', function(){
  return gulp.src('style.css')
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

gulp.task('lint', function(){
  

});

gulp.watch("./build/js/*.js").on('change', browserSync.reload);

gulp.watch("style.css").on('change', browserSync.reload);

gulp.task('default', gulp.parallel('watch', 'browser-sync')); //runs script in parallel