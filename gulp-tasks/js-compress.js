module.exports = function (gulp, plugins, getPath, join) {
  return () => {
    const buildPath = getPath({type: 'folder', name: 'dist'});
    const jsPath = getPath({type: 'folder', name: 'js'});
    const fileName = getPath({type: 'file', name: 'main_js'});

    return gulp.src(join(jsPath, fileName))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.stripDebug())
      //.pipe(plugins.uglify())
      .pipe(plugins.rename({
        extname: '.min.js'
      }))
      // For using ES2015.
      .pipe(plugins.babel({
        presets: ['es2015']
      }))
      .pipe(plugins.sourcemaps.write('.'))
      .pipe(gulp.dest(buildPath))
      .pipe(plugins.size({title: 'Total compressed JavaScript files (with source maps) size:'}));
  };
};
