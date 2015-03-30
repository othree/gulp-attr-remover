Remove element attribute if predicate is true

USAGE
-----


    function predicate(elem) {
      "use strict";
      if (!/^((ftp|rtsp|mms):)?\/\//.test(elem.attr('href'))) {
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
