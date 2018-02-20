(function () {
  'use strict';

  const gulp = require('gulp');
  const eslint = require('gulp-eslint');
  const paths = require('../paths');

  gulp.task('inspect', function () {
    return gulp.src([paths.js])
      .pipe(eslint({
        extends: 'eslint:recommended',
        parser: 'babel-eslint'
      }))
      .pipe(eslint.failAfterError());
  });
})();