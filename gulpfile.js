var gulp = require('gulp');
var coffee = require('gulp-coffee');
var handlebars = require('gulp-handlebars');
var defineModule = require('gulp-define-module');
var del = require('del');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

var paths = {
  main_source: 'public/javascripts/*.js',
  views: 'views/*',
  coffee_source: 'public/**/*.coffee'
};

gulp.task('clean', function(cb){
  del('dist', {force: true}, cb);
});

gulp.task('build-client', function(){
  browserify({
        entries: ['./src/client/main.js'],
        paths: ['./src/client/'],
        debug: true})
     .bundle()
     .pipe(source('client_blob.js'))
     .pipe(gulp.dest('./dist/client'));

  gulp.src('./src/client/index.html')
    .pipe(gulp.dest('dist/client'));

  gulp.src('./src/client/images/*')
    .pipe(gulp.dest('dist/client/images'));
  gulp.src('./src/client/img/*')
    .pipe(gulp.dest('dist/client/img'));
});

gulp.task('build-server', function(){

  gulp.src('./src/server/app.js')
    .pipe(gulp.dest('dist'));
  gulp.src('./src/server/routes/*.js')
    .pipe(gulp.dest('dist/routes/'));
});

gulp.task('build', ['clean'], function(){

  gulp.start('build-client');
  gulp.start('build-server');
});

gulp.task('test', function(){

  return browserify('./test/app.js')
         .bundle()
         //Pass desired output filename to vinyl-source-stream
         .pipe(source('bundle.js'))
         // Start piping stream to tasks!
         .pipe(gulp.dest('./testDist/'));
});
