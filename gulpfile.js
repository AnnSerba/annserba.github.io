var gulp        = require('gulp'),
    less        = require('gulp-less'),
    jade        = require('gulp-jade'),
    watch       = require('gulp-watch'),
    debug       = require('gulp-debug'),
    livereload  = require('gulp-livereload'),
    tinylr      = require('tiny-lr'),
    server      = tinylr(),
    paths = {
        src: './src',
        dest: './dest',
        root: '.',
        bootstrap:'node_modules/admin-lte/bootstrap/',
        adminLTE:'node_modules/admin-lte/dist/',
        plugins:'node_modules/admin-lte/plugins/'
    };

gulp.task('less',function(){
    gulp.src(paths.src+'/less/*.less')
        .pipe(less())
        .pipe(debug({ title: '*.less files changed' }))
        .pipe(gulp.dest(paths.dest+'/css'))
        .pipe(livereload(server));
});
gulp.task('copy-jquery',function(){
    gulp.src(paths.plugins+'jQuery/jQuery-2.2.0.min.js')
        .pipe(debug({ title: '*.js files copy' } ))
        .pipe(gulp.dest(paths.dest+'/js'))
        .pipe(livereload(server));
    gulp.src(paths.plugins+'jQueryUI/jQuery-ui.min.js')
        .pipe(debug({ title: '*.js files copy' } ))
        .pipe(gulp.dest(paths.dest+'/js'))
        .pipe(livereload(server));
});
gulp.task('copy-bootstrap',function(){
    gulp.src(paths.bootstrap+'css/bootstrap.min.css')
        .pipe(debug({ title: '*.css files copy' } ))
        .pipe(gulp.dest(paths.dest+'/css'))
        .pipe(livereload(server));
    gulp.src(paths.bootstrap+'js/bootstrap.min.js')
        .pipe(debug({ title: '*.js files copy' } ))
        .pipe(gulp.dest(paths.dest+'/js'))
        .pipe(livereload(server));
});

gulp.task('copy-adminLTE',function(){
    gulp.src(paths.adminLTE+'css/AdminLTE.min.css')
        .pipe(debug({ title: '*.css files copy' } ))
        .pipe(gulp.dest(paths.dest+'/css'))
        .pipe(livereload(server));
    gulp.src(paths.adminLTE+'css/skins/_all-skins.min.css')
        .pipe(debug({ title: '*.css files copy' } ))
        .pipe(gulp.dest(paths.dest+'/css'))
        .pipe(livereload(server));
    gulp.src(paths.adminLTE+'js/app.min.js')
        .pipe(debug({ title: '*.js files copy' } ))
        .pipe(gulp.dest(paths.dest+'/js'))
        .pipe(livereload(server));
});

gulp.task('jade', function() {
    gulp.src(paths.src+'/jade/index.jade')
        .pipe(jade({ pretty: true }))
        .pipe(debug({ title: 'jade: ' }))
        .pipe(gulp.dest(paths.root))
        .pipe(livereload(server));
    gulp.src(paths.src+'/jade/forYandex.jade')
        .pipe(jade({ pretty: true }))
        .pipe(debug({ title: 'jade: ' }))
        .pipe(gulp.dest(paths.dest+'/pages/'))
        .pipe(livereload(server));
});

gulp.task('watch', function () {
    gulp.watch(paths.plugins+'jQuery/jQuery-2.2.0.min.js', ['copy-jquery']);
    gulp.watch(paths.bootstrap+'css/bootstrap.min.css', ['copy-bootstrap']);
    gulp.watch(paths.adminLTE+'css/AdminLTE.min.css',['copy-adminLTE']);
    server.listen(35729, function (err) {
        if (err) { return console.log(err); }
        gulp.watch(paths.src+'/less/*.less', ['less']);
        gulp.watch(paths.src+'/jade/*.jade',['jade']);
        gulp.watch(paths.src+'/jade/*/*.jade',['jade']);
    });
});

gulp.task('default', ['copy-jquery','copy-bootstrap','copy-adminLTE','jade','less','watch']);