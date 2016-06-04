var gulp = require('gulp');
var server = require('karma').Server;

gulp.task('test', function (done) {
  return new server({
    configFile: require('path').resolve('karma.conf.js'),
    singleRun: true,
  }, done).start();
});

gulp.task('default', ['test']);