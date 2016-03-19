module.exports = function (gulp, plugins, getPath, join) {
  return () => {
    const jsPath = getPath({type: 'folder', name: 'js'});

    return gulp.src([
        join(jsPath, '**/*.js')
      ])
      .pipe(plugins.eslint())
      .pipe(plugins.eslint.format())
      .pipe(plugins.size({title: 'Total uncompressed JavaScript files size:'}));
  };
};
