Remove element attribute if predicate is true

USAGE
-----


    function predicate(link) {
      "use strict";
      if (link && !/^((ftp|rtsp|mms):)?\/\//.test(link)) {
        return true;
      }
      return false;
    }

    gulp.task('default', function () {
      "use strict";

      gulp.src('./cases/*.html')
        .pipe(modf('a', 'href', predicate))
        .pipe(gulp.dest('./output'));
    });


LICENSE
-------

MIT
