const distPath = 'dist';
const srcPath = 'src';

const path = {
    build: {
        html: distPath + '/',
        css: distPath + '/css/',
        js: distPath + '/js/',
        images: distPath + '/images/',
        fonts: distPath + '/fonts/'
    },
    src: {
        html: [srcPath + '/*.html', '!' + srcPath + '/_*.html'],
        scss: srcPath + '/scss/style.scss',
        js: srcPath + '/js/script.js',
        images: srcPath + '/images/**/*.{jpg, png, svg}',
        fonts: srcPath + '/fonts/*'
    },
    watch: {
        html: srcPath + '/**/*.html',
        scss: srcPath + '/scss/**/*.scss',
        js: srcPath + '/js/**/*.js',
        images: srcPath + '/images/**/*.{jpg, png, svg}',
        fonts: srcPath + '/fonts/*'
    },
    clean: `./${distPath}/`
};

const {src , dest} = require('gulp'),
    gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    fileInclude = require('gulp-file-include'),
    del = require('del'),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    groupMediaQueries = require('gulp-group-css-media-queries'),
    cleanCss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify-es').default,
    babel = require('gulp-babel'),
    imagemin = require('gulp-imagemin');
    // webp = require('gulp-webp'),
    // webpHTML = require('gulp-webp-html');

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: `./${distPath}/`
        },
        port: 3000,
        notify: false
    });
});

gulp.task('html', function() {
    return src(path.src.html)
        .pipe(fileInclude())
        // .pipe(webpHTML())
        .pipe(dest(path.build.html))
        .pipe(browserSync.stream())
});

gulp.task('images', function() {
    return src(path.src.images)
        // .pipe(webp({
        //     quality: 70
        // }))
        .pipe(dest(path.build.images))
        .pipe(src(path.src.images))
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 3,
        }))
        .pipe(dest(path.build.images))
        .pipe(browserSync.stream())
});

gulp.task('scss', function() {
    return src(path.src.scss)
        .pipe(scss())
        .pipe(groupMediaQueries())
        .pipe(autoprefixer({
            overrideBrowserslist: ["last 5 versions"],
            cascade: true
        }))
        .pipe(dest(path.build.css))
        .pipe(cleanCss())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(dest(path.build.css))
        .pipe(browserSync.stream())
});

gulp.task('js', function() {
    return src(path.src.js)
        .pipe(babel({
            presets: ["@babel/preset-env"]
        }))
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(dest(path.build.js))
        .pipe(browserSync.stream())
})

gulp.task('fonts', function() {
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts))
        .pipe(browserSync.stream())
});

gulp.task('watch-files', function() {
    gulp.watch([path.watch.html], gulp.series('html'));
    gulp.watch([path.watch.scss], gulp.series('scss'));
    gulp.watch([path.watch.js], gulp.series('js'));
    gulp.watch([path.watch.images], gulp.series('images'));
    gulp.watch([path.watch.fonts], gulp.series('fonts'));
})

gulp.task('clean', function() {
    return del(path.clean)
})

const build = gulp.series('clean', gulp.parallel('scss', 'js', 'html', 'images', 'fonts'))
const watch = gulp.parallel(build, 'watch-files', 'browser-sync')
const start = gulp.series('js', watch)


exports.build = build;
exports.watch = watch;
exports.default = start;