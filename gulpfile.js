var gulp = require('gulp');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var browsersync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf=require('gulp-if');
var cssnano = require('gulp-cssnano');
var runsequence = require('run-sequence');

gulp.task('hello', function() {
    
    console.log('Hello Zell');

});

gulp.task('imagemin', function() {

    var img_src = 'src/images/**/*', img_dest = 'build/images';

    gulp.src(img_src)
    .pipe(changed(img_dest))
    .pipe(imagemin())
    .pipe(gulp.dest(img_dest));

});

gulp.task('sass', function() {

    return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browsersync.reload({
        stream: true
    }))
});

gulp.task ('watch', ['browserSync', 'sass'],  function(){
    
    gulp.watch('app/scss/**/*.scss', ['sass']);

    gulp.watch('app/*.html', browsersync.reload);
    gulp.watch('app/js/**/*.js', browsersync.reload);

})

gulp.task('browserSync', function() {
    browsersync.init({
        server: {
            baseDir: 'app'
        }
    });
})

gulp.task('useref', function(){
    return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
    
})

gulp.task('default', function(callback) {
    runsequence('sass', 'useref', callback);
})