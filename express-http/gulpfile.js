const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const del = require('del');
const uglify = require('gulp-uglify');
const Cache = require('gulp-file-cache');

const cache = new Cache();

gulp.task('compile', function () {
  return gulp.src('./src/**/*.js') // your ES2015 code
    .pipe(cache.filter()) // remember files
    .pipe(babel({ presets: ['env'] })) // compile new ones
    .pipe(cache.cache()) // cache them
    .pipe(gulp.dest('./dist')) // write them
});

gulp.task('watch', ['compile'], function () {
  const stream = nodemon({
    script: 'dist/app.js', // run ES5 code
    watch: 'src', // watch ES2015 code
    tasks: ['compile'] // compile synchronously onChange
  })

  return stream;
});

gulp.task('clean', () => del('./build'));

gulp.task('build', ['clean'], () => {
  return gulp.src('./src/**/*.js')
    .pipe(concat('index.js'))
    .pipe(babel({ presets: ['env'] }))
    .pipe(uglify())
    .pipe(gulp.dest('./build'));
});