import gulp from 'gulp';
import del from 'del';
import path from 'path';
import runSequence from 'run-sequence';

function getPath (path) {
  return join(path.type === 'folder' ?  __dirname : '',
    projectMap[path.type][path.name]);
};

function getTask (task) {
  return require(`./gulp-tasks/${task}`)(gulp, plugins, getPath, join);
}

const join = path.join;
const pluginName = 'jquery.page-detector';

const plugins = require('gulp-load-plugins')({
  scope: ['dependencies']
});

const projectMap = {
  folder: {
    dist: '/dist',
    js: '/src'
  },
  file: {
    main_js: `${pluginName}.js`
  }
};

gulp.task('js:compress', getTask('js-compress'));
gulp.task('js:eslint', getTask('js-eslint'));

// ################################################################################
// ##                            Update app version.                             ##
// ################################################################################
function updateVersion(importance) {
  // get all the files to bump version in
  return gulp.src(['./package.json', './npm-shrinkwrap.json'])
    // Bump the version number in those files.
    .pipe(plugins.bump({
      type: importance
    }))
    // Save it.
    .pipe(gulp.dest('./'));
}

gulp.task('patch', () => updateVersion('patch'));

gulp.task('feature', () => updateVersion('minor'));

gulp.task('release', () => updateVersion('major'));


// ################################################################################
// ##                          Build production files.                           ##
// ################################################################################
gulp.task('build', (callback) => {
  runSequence(
    [
      'js:eslint',
      'js:compress'
    ],
    callback);
});

gulp.task('help', () => {
  console.log('The list of available tasks:');
  plugins.taskListing();
});

gulp.task('default', ['help'], () => {});
