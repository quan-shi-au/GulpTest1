var gulp = require('gulp');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');


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

    return gulp.src('Src/Styles/**/*')
    .pipe(sass())
    .pipe(gulp.dest('Build/Styles'));
});

