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
  del('dist', cb);
});

gulp.task('coffee', function(){

  gulp.src(paths.coffee_source)
  .pipe(coffee())
  .pipe(gulp.dest('dist/client'));
});

gulp.task('copy-js', function(){

  gulp.src(paths.main_source)
  .pipe(gulp.dest("dist/client/javascripts"));

  gulp.src(paths.views)
  .pipe(gulp.dest("dist/client/views"));
});

gulp.task('vendor', function(){

  gulp.src("public/images/*")
  .pipe(gulp.dest("dist/client/images"));
  gulp.src("public/img/*")
  .pipe(gulp.dest("dist/client/img"));
  gulp.src("public/stylesheets/*")
  .pipe(gulp.dest("dist/client/stylesheets"));
  gulp.src("public/javascripts/vendor/*")
  .pipe(gulp.dest("dist/client/javascripts/vendor"));
});

gulp.task('handlebars', function(){

  gulp.src("public/**/res/templates/*.html")
  .pipe(handlebars())
  .pipe(defineModule('node'))
  .pipe(gulp.dest("dist/client"));
});

gulp.task("build-client", ['clean', 'vendor', 'copy-js', 'coffee']);

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('test', function(){

  return browserify('./test/app.js')
         .bundle()
         //Pass desired output filename to vinyl-source-stream
         .pipe(source('bundle.js'))
         // Start piping stream to tasks!
         .pipe(gulp.dest('./testDist/'));
});
