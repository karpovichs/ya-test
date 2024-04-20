import gulp from 'gulp'

import plumber from 'gulp-plumber'
import browserSync from 'browser-sync'
import del from 'del'
import rename from 'gulp-rename'

import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import csso from 'gulp-csso'

import webpack from 'webpack-stream'
import webpackConfig from './webpack.config'

import pug from 'gulp-pug'
import posthtml from 'gulp-posthtml';
import include from 'posthtml-include';

import svgstore from 'gulp-svgstore'

const sass = gulpSass(dartSass)
const server = browserSync.create()

gulp.task('clean', () => del('build'))

gulp.task('copy', () => gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**',
  ], {
    base: 'source',
    removeBOM: false,
  })
    .pipe(gulp.dest('build')))

gulp.task('css', () => gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
    ]))
    .pipe(csso())
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream()))

gulp.task('pug', () => gulp.src('source/pug/*.pug')
  .pipe(plumber())
  .pipe(pug())
  .pipe(posthtml([
    include(),
  ]))
  .pipe(gulp.dest('build')))

gulp.task('sprite', () => gulp.src('source/img/sprite/*.svg')
  .pipe(svgstore({
    inlineSvg: true,
  }))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('build/img')));

gulp.task('js', () => gulp.src('source/js/index.js')
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest('build/js')))

gulp.task('server', () => {
    server.init({
      server: 'build/',
    })
    gulp.watch('source/**/*.pug', gulp.series('pug', 'refresh'))
    gulp.watch('source/img/**/*', gulp.series('copy', 'sprite', 'pug', 'refresh'))
    gulp.watch('source/js/**/*', gulp.series('js', 'refresh'))
    gulp.watch('source/sass/**/*', gulp.series('css'))
  })

gulp.task('refresh', (done) => {
    server.reload()
    done()
})

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel(
      'copy',
      'css',
    ),
    gulp.parallel(
      'sprite',
    ),
    gulp.parallel(
      'pug',
      'js',
    ),
  ))

gulp.task('start', gulp.series(
    'build',
    'server',
  ))
