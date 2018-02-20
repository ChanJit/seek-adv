(function () {
  'use strict';

  var gulp = require('gulp'),
    babel = require('gulp-babel'),
    mergeStream = require('merge-stream'),
    paths = require('../paths'),
    mocha = require('gulp-mocha'),
    istanbul = require('gulp-babel-istanbul');

  require('babel-polyfill');
  require('babel-core/register');

  //    coverageEnforcer = require("gulp-istanbul-enforcer");

  process.env.NODE_ENV = 'test';

  gulp.task('test', function (done) {
    mergeStream(
      gulp.src([paths.js])
        .pipe(babel() /*istanbul()*/),
      gulp.src(paths.unit_tests)
        .pipe(babel())
    ).pipe(istanbul.hookRequire()) // Force `require` to return covered files
      .on('finish', function () {
        gulp.src(paths.unit_tests)
          .pipe(mocha({ reporter: process.env.TEAMCITY_VERSION ? 'mocha-teamcity-reporter' : 'spec', timeout: 10000 }))
          //  .pipe(istanbul.writeReports())
          //   .pipe(coverageEnforcer({
          //     thresholds : {
          //       statements : 70,
          //       branches : 70,
          //       lines : 70,
          //       functions : 70
          //     },
          //     coverageDirectory: paths.coverage,
          //     rootDirectory: ''
          //   })) // Creating the reports after tests have run
          .on('end', done);
      });
  });
})();