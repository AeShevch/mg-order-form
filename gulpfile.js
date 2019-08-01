const gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    browserSync = require('browser-sync').create();
function reload(cb) {
    browserSync.reload();
    cb()
}
function scss() {
    return gulp.src('src/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
}

function js() {
    return gulp.src('src/script.js')
        .pipe(babel())
        .pipe(uglify({
            toplevel: true
        }))
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream());
}

function clean() {
    return del(['dist/*'])
}

gulp.task('scss', scss);
gulp.task('js', js);



function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('src/style.scss', scss);
    gulp.watch('src/script.js', js);
    gulp.watch('./index.html', reload)
}

gulp.task('watch', watch);

gulp.task('build', gulp.series(
    clean,
    gulp.parallel(scss, js)
));

gulp.task('default', gulp.series('build', 'watch'));

