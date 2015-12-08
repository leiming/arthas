"use strict";

var gulp = require('gulp')
var source = require('vinyl-source-stream')
var browserify = require('browserify')
var buffer = require('vinyl-buffer')
var plugins = require('gulp-load-plugins')()

var watchify = require('watchify')
var babelify = require('babelify')
require("babelify/polyfill")
var browserify_shim = require('browserify-shim')
var browserSync = require('browser-sync').create()
var runSequence = require('run-sequence')

//var LessPluginAutoPrefix = require('less-plugin-autoprefix')
//var autoprefixPlugin = new LessPluginAutoPrefix({browsers: ["last 2 versions"]})

var pkg = require('./package.json')
var dirs = pkg['h5bp-configs'].directories

var argv = require('yargs').argv;

// Input File

var example = argv.example
var inputFile = argv.input || example || 'bundle'
var outputFile = argv.output || inputFile

/**********************
 * Clean task.
 **********************/

gulp.task('clean', function (done) {
  require('del')([
    dirs.archive,
    dirs.dist + '/**'
  ], done)
})

/**********************
 * Watch task.
 **********************/

gulp.task('watch', [
  'watch:js',
  'watch:html',
  'watch:less'
])

var browserifyConfig = pkg.browserify;


var entries = dirs.src + '/js/' + inputFile + '.jsx';
var dest = dirs.dist + '/js/'

if (example) {
  entries = 'examples/' + example + '/index.js';
  dest = 'examples/' + example + '/dist';
}

var bundler = watchify(browserify({
  cache: {}, packageCache: {}, fullPaths: false,
  entries: entries,
  extensions: browserifyConfig.extensions,
  debug: browserifyConfig.debug
}))

//bundler.transform(babelify.configure({stage: 0}))
bundler.transform(babelify.configure({stage: 0, loose: ["es6.modules"]}))
// On update recompile
bundler.on('update', devBundle)
gulp.task('watch:js', devBundle)
gulp.task('js', devBundle)


function devBundle() {
  return bundler.bundle()
    .on('error', function (err) {
      plugins.util.log(err.message)
      browserSync.notify("Browserify Error!");
      this.emit('end')
    })
    .pipe(source(outputFile + '.js'))
    .pipe(buffer())
    .pipe(gulp.dest(dest))
    .pipe(browserSync.reload({stream: true, once: true}))
}

function bundle() {
  return bundler.bundle()
    .on('error', function (err) {
      plugins.util.log(err.message)
      browserSync.notify("Browserify Error!");
      this.emit('end')
    })
    .pipe(source(outputFile + '.js'))
    .pipe(buffer())
    .pipe(plugins.sourcemaps.init({loadMaps: true}))
    .pipe(plugins.uglify())
    .pipe(plugins.utf8izeSourcemaps())
    .pipe(plugins.sourcemaps.write())
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(dirs.dist + '/js/'))
    .pipe(browserSync.reload({stream: true, once: true}))
}


/**********************
 * Copy task.
 **********************/

gulp.task('copy', ['copy:html', 'copy:jquery', 'copy:normalize', 'copy:misc'])

gulp.task('copy:html', function () {
  return gulp.src(dirs.src + '/' + inputFile + '.html')
    .pipe(plugins.plumber())
    .pipe(gulp.dest(dirs.dist))
    .pipe(browserSync.stream());
})

gulp.task('copy:jquery', function () {
  return gulp.src(['node_modules/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest(dirs.dist + '/js/vendor'))
})

gulp.task('copy:normalize', function () {
  return gulp.src(['node_modules/normalize.css/normalize.css'])
    .pipe(gulp.dest(dirs.dist + '/css/vendor'));
})

gulp.task('copy:misc', function () {
  return gulp.src([
    dirs.src + '/**/*',
    '!' + dirs.src + '/' + inputFile + '.html',
    '!' + dirs.src + '/css/**',
    '!' + dirs.src + '/js/**'
  ], {
    dot: true
  }).pipe(gulp.dest(dirs.dist));
})

/**********************
 * CSS task.
 **********************/

gulp.task('watch:less', function () {
  gulp.watch(dirs.src + '/less/**/*.less', ['less'])
})

gulp.task('less', function () {
//  return gulp.src(dirs.src + '/less/**/' + inputFile + '.less')
  return gulp.src(dirs.src + '/less/**/*.less')
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.less())
    //.pipe(plugins.less({
    //  plugins: [autoprefixPlugin]
    //}))
    .pipe(plugins.utf8izeSourcemaps())
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(dirs.dist + '/css'))
    .pipe(browserSync.stream())
})

gulp.task('css', ['minify-css'])

gulp.task('watch:css', function () {
  gulp.watch(dirs.src + '/css/**/*.css', ['minify-css'])
})

gulp.task('minify-css', function () {
//  return gulp.src(dirs.src + '/css/**/' + inputFile + '.css')
  return gulp.src(dirs.src + '/css/**/*.css')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.minifyCss({compatibility: 'ie8'}))
    .pipe(plugins.rename(outputFile + '.css'))
    .pipe(plugins.utf8izeSourcemaps())
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(dirs.dist + '/css'))
    .pipe(browserSync.stream());
})


/**********************
 * HTML task.
 **********************/

// Todo: deploy rev-replace

gulp.task('watch:html', function () {
  gulp.watch(dirs.src + '/' + inputFile + '.html', ['copy:html'])
})

/**********************
 * Default task.
 **********************/

gulp.task('build', function (done) {
  runSequence(
    'clean',
    ['less', 'watch'],
    'copy',
    done);
});

gulp.task('default', ['build'], function () {

  var baseDirs = [dirs.dist];
  var index = outputFile + '.html'

  if (example) {
    baseDirs = ["examples/" + example, dirs.dist]
    index = "index.html"
  }

  browserSync.init({
    server: {
     baseDir: baseDirs,
     index: index
    }
  })
})

