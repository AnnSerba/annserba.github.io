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
        css:[
            'node_modules/admin-lte/bootstrap/css/bootstrap.min.css',
            'node_modules/admin-lte/dist/css/AdminLTE.min.css',
            'node_modules/admin-lte/dist/css/skins/skin-yellow-light.min.css'
        ],
        js:[
            'node_modules/admin-lte/bootstrap/js/bootstrap.min.js',
            'node_modules/admin-lte/dist/js/app.min.js',
            'node_modules/admin-lte/plugins/jQuery/jQuery-2.2.0.min.js',
            'node_modules/admin-lte/plugins/jQueryUI/jQuery-ui.min.js'
        ],
    };


gulp.task('copy',function(){
    gulp.src(paths.css)
        .pipe(debug({ title: '*.css files copy' } ))
        .pipe(gulp.dest(paths.dest+'/css'))
        .pipe(livereload(server));
    gulp.src(paths.js)
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
gulp.task('less',function(){
    gulp.src(paths.src+'/less/*.less')
        .pipe(less())
        .pipe(debug({ title: '*.less files changed' }))
        .pipe(gulp.dest(paths.dest+'/css'))
        .pipe(livereload(server));
});

gulp.task('watch', function () {
    server.listen(35729, function (err) {
        if (err) { return console.log(err); }
        gulp.watch(paths.src+'/less/*.less', ['less']);
        gulp.watch(paths.src+'/jade/*.jade',['jade']);
        gulp.watch(paths.src+'/jade/*/*.jade',['jade']);
    });
});

gulp.task('default', ['copy','jade','less','watch']);