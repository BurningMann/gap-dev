'use strict';

import { paths } from '../gulpfile.babel';
import gulp from 'gulp';
import newer from 'gulp-newer';
import debug from 'gulp-debug';
import browsersync from 'browser-sync';

gulp.task('videos', () => {
  return gulp
    .src(paths.videos.src)
    .pipe(newer(paths.videos.dist))
    .pipe(gulp.dest(paths.videos.dist))
    .pipe(
      debug({
        title: 'Videos',
      })
    )
    .pipe(browsersync.stream());
});
