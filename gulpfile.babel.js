import gulp from 'gulp'

import plumber from 'gulp-plumber'
import browserSync from 'browser-sync'
import del from 'del'

import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import csso from 'gulp-csso'

import webpack from 'webpack-stream'
import webpackConfig from './webpack.config'

import pug from 'gulp-pug'


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
    .pipe(sass({
      // includePaths: ['./node_modules', normalize.includePaths],
    }))
    .pipe(postcss([
      autoprefixer(),
    ]))
    .pipe(csso())
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream()))

gulp.task('pug', () => gulp.src('source/pug/*.pug')
  .pipe(plumber())
  .pipe(pug())
  .pipe(gulp.dest('build')))

  gulp.task('js', () => gulp.src('source/js/index.js')
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest('build/js')))

gulp.task('server', () => {
    server.init({
      server: 'build/',
    })
    gulp.watch('source/**/*.pug', gulp.series('pug', 'refresh'))
    gulp.watch('source/img/**/*', gulp.series('copy', 'pug', 'refresh'))
    gulp.watch('source/js/**/*', gulp.series('js', 'refresh'))
    gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('css'))
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
      'pug',
      'js',
    ),
  ))

gulp.task('start', gulp.series(
    'build',
    'server',
  ))
