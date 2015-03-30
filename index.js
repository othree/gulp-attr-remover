/*jslint indent: 2, vars: true */
var es = require('event-stream');
var gutil = require('gulp-util');
var Buffer = require('buffer').Buffer;

var cheerio = require('cheerio');

function modify(file, elem, attr, predicate) {
  "use strict";

  if (predicate(elem)) { elem.removeAttr(attr); }
}

module.exports = function (query, attr, predicate) {
  "use strict";

  var queryHtml = function (file) {
    if (file.isNull()) { return this.emit('data', file); } // pass along
    if (file.isStream()) { return this.emit('error', new Error("gulp-coffee: Streaming not supported")); }

    var str = file.contents.toString('utf8');
    var $ = cheerio.load(str);

    $(query).each(function () {
      var elem = $(this);
      modify(file, elem, attr, predicate);
    });

    file.contents = new Buffer($.root().html());
    this.emit('data', file);
  };

  return es.through(queryHtml);
};
