'use strict';

import { paths } from '../gulpfile.babel';
import gulp from 'gulp';
import newer from 'gulp-newer';
import debug from 'gulp-debug';
import browsersync from 'browser-sync';

gulp.task('docs', () => {
  return gulp
    .src(paths.docs.src)
    .pipe(newer(paths.docs.dist))
    .pipe(gulp.dest(paths.docs.dist))
    .pipe(
      debug({
        title: 'Docs',
      })
    )
    .pipe(browsersync.stream());
});
