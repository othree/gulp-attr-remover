/*jslint node: true, vars: true */
/*global describe: false, it: false */
var mod = require('../');
var should = require('should');
var gutil = require('gulp-util');
var path = require('path');
var cheerio = require('cheerio');
require('mocha');

var createFile = function (filepath, contents) {
    "use strict";
    var base = path.dirname(filepath);
    return new gutil.File({
        path: filepath,
        base: base,
        cwd: path.dirname(base),
        contents: contents
    });
};

describe('gulp-remove-attr', function () {
    "use strict";
    it('mod anchor href', function () {

        var htmlString = "<html><head></head><body><a href='/path/file.ext'></a><a href='/altpath/file.ext'>Anchor</a><div>footer</div></body></html>";
        var htmlBuffer = new Buffer(htmlString);

          
        mod('a', 'href', function (path) {
          return true;
        }).on('data', function (file) {
            console.log(file.contents);
            var $ = cheerio.load(file.contents);
            $('a').each(function () {
              var test = $(this).attr('href');
              should.not.exist(test);
            });
        }).write(createFile('test.html', htmlBuffer));

    });
});
