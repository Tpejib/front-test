import {src, dest, task, watch, series, parallel} from 'gulp'
import webpack from 'webpack-stream'
import {init as initMap, write as writeMap} from 'gulp-sourcemaps'
import cssnano from 'cssnano'
import sass, { logError } from 'gulp-sass'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import browserSync from 'browser-sync'
import fileInclude from 'gulp-file-include'
import del from 'del'
import imagemin from 'gulp-imagemin'

const bSync = browserSync.create() 

const distPath = 'dist'
const srcPath = 'src'

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
        images: srcPath + '/images/**/*.{jpg,png,svg}',
        fonts: srcPath + '/fonts/*.{ttf,woff,woff2,eot}'
    },
    watch: {
        html: srcPath + '/**/*.html',
        scss: srcPath + '/scss/**/*.scss',
        js: srcPath + '/js/**/*.js',
        images: srcPath + '/images/**/*.{jpg,png,svg}',
        fonts: srcPath + '/fonts/*.{ttf,woff,woff2,eot}'
    },
    clean: `./${distPath}/`
};

function server() {
    bSync.init({
        server: {
            baseDir: `./${distPath}/`
        },
        port: 3000,
        notify: false
    })
}

task('html', function() {
    return src(path.src.html)
        .pipe(fileInclude())
        .pipe(dest(path.build.html))
        .pipe(bSync.stream())
})

task('images', function() {
    return src(path.src.images)
        .pipe(dest(path.build.images))
        .pipe(src(path.src.images))
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 3,
        }))
        .pipe(dest(path.build.images))
        .pipe(bSync.stream())
})

task('scss', function() {
    return src(path.src.scss)
        // .pipe(initMap())
        .pipe(sass({
            includePaths: ['node_modules']
        }))
        .on('error', logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        // .pipe(writeMap())
        .pipe(dest(path.build.css))
        .pipe(bSync.stream())
})

task('js', function() {
    return src(path.src.js)
        .pipe(
            webpack({
                module: {
                    rules: [
                        {
                            test: /\.js/,
                            exclude: /(node_modules)/,
                            use: {
                                loader: 'babel-loader',
                                options: {
                                    presets: []
                                }
                            }
                        }
                    ]
                },
                mode: 'production',
                // devtool: 'inline-source-map',
                output: {
                    filename: 'bundle.js'
                }
            })
        )
        .on('error', function handleError() {
            this.emit('end')
        })
        .pipe(dest(path.build.js))
        .pipe(bSync.stream())
})

task('fonts', function() {
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts))
        .pipe(bSync.stream())
})

task('watch-files', function() {
    watch([path.watch.html], series('html'));
    watch([path.watch.scss], series('scss'));
    watch([path.watch.js], series('js'));
    watch([path.watch.images], series('images'));
    watch([path.watch.fonts], series('fonts'));
})

task('clean', function() {
    return del(path.clean)
})

const build = series('clean', parallel('scss', 'js', 'html', 'images', 'fonts'))
const watcher = parallel(build, 'watch-files', server)
const start = series(build, watcher)


exports.build = build
exports.watch = watcher
exports.default = start