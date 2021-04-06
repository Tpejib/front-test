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
function html() {
    return src(path.src.html)
        .pipe(fileInclude())
        .pipe(dest(path.build.html))
        .pipe(bSync.stream())
}
function images() {
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
}

function styles() {
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
}
function scripts() {
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
}
function fonts() {
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts))
        .pipe(bSync.stream())
}

function watchFiles() {
    watch([path.watch.html], html);
    watch([path.watch.scss], styles);
    watch([path.watch.js], scripts);
    watch([path.watch.images], images);
    watch([path.watch.fonts], fonts);
}

function cleanDist() {
    return del(path.clean)
}

const build = series(cleanDist, parallel(styles, scripts, html, images, fonts))
const watcher = parallel(build, watchFiles, server)
const start = series(build, watcher)


exports.build = build
exports.watch = watcher
exports.default = start