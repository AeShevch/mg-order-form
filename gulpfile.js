const gulp = require('gulp'),
    sass = require('gulp-sass'),
    babel = require('gulp-babel'),
    browserSync = require('browser-sync').create();

gulp.task('sass', function () {
    return gulp.src('src/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist'))
        .on('end', browserSync.reload);
});

gulp.task("js", function () {
    return gulp.src('src/script.js')
        .pipe(babel())
        .pipe(gulp.dest("dist"))
        .on('end', browserSync.reload);
});

gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(gulp.dest("dist"))
        .on('end', browserSync.reload);
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});


gulp.task('watch', function () {
    gulp.watch('src/style.scss', gulp.parallel('sass', 'browser-sync'));
    gulp.watch('src/script.js', gulp.parallel('js', 'browser-sync'));
    gulp.watch('src/index.html', gulp.parallel('html', 'browser-sync'))
});


