var gulp       = require('gulp'),
    browserify = require('gulp-browserify');

gulp.task('scripts', function () {

    gulp.src(['app/main.js'])
        .pipe(browserify({
            debug: true,
            transform: [ 'reactify', 'stage-0', 'es2015' ]
        }))
        .pipe(gulp.dest('./public/'));

});

// DEFAULT
gulp.task('default', [
	'scripts'
]);
