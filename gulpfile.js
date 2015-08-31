var gulp = require('gulp');
var del = require('del');
var browserify = require('browserify');
var browserify_css = require('browserify-css');
var source = require('vinyl-source-stream');

var paths = {
  main_source: 'public/javascripts/*.js',
  views: 'views/*',
};

gulp.task('clean', function(cb){
  del('dist', {force: true}, cb);
});

gulp.task('build-client', function(cb){

  browserify({
          entries: ['./src/client/main.js'],
          paths: [ './node_modules/', './src/client/'],
          debug: true,
        })
    .transform(browserify_css, {
       processRelativeUrl: function(relativeUrl) {
          var array = relativeUrl.split('\\');
          return "./assets/" + array[array.length - 1];
       }})
    .bundle()
    .pipe(source('client_blob.js'))
    .pipe(gulp.dest('./dist/client'));

  gulp.src('./src/client/index.html')
    .pipe(gulp.dest('dist/client'));

  gulp.src('./node_modules/bootstrap/fonts/*')
    .pipe(gulp.dest('dist/client/assets'));

  gulp.src('./node_modules/jquery-ui/themes/ui-darkness/images/*')
    .pipe(gulp.dest('dist/client/assets'));

  gulp.src('./src/client/images/*')
    .pipe(gulp.dest('dist/client/assets'));
    cb();
});

gulp.task('watch-client', function(){
  gulp.watch('./src/client/*',
             ['build-client']);
});

gulp.task('build-server', function(cb){

  gulp.src('./src/server/app.js')
    .pipe(gulp.dest('dist'));
  gulp.src('./src/server/routes/*.js')
    .pipe(gulp.dest('dist/routes/'));
  cb();
});

gulp.task('build', ['clean'], function(cb){

  gulp.start('build-client');
  gulp.start('build-server');
  cb();
});
