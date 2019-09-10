const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");

function style() {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(sass({
            outputStyle: "expanded"
        }))
        .pipe(gulp.dest('./css'))
        .pipe(postcss([autoprefixer()]))
        .pipe(gulp.dest('./css'))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
}

function imgMinimizer() {
    return gulp.src('./img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./minified/images'))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./scss/**/*.scss', style);
    gulp.watch('./img/*', imgMinimizer);
    gulp.watch('./*.html').on('change', browserSync.reload);

}

exports.style = style;
exports.watch = watch;
exports.imgMinimizer = imgMinimizer;