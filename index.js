'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var cheerio = require('cheerio');
var uriRegex = new RegExp("(http:|ftp:|https:)?//.+");

module.exports = function(opts) {
    var prependSrc = '';
    var keepOrigin = false;
    if (opts) {
        prependSrc = opts.prependSrc || '/';
        keepOrigin = opts.keepOrigin || false;
    }

    return through.obj(function(file, enc, callback) {

        if (file.isNull()) {
            this.push(file);
            return callback();
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('Streaming not supported'));
            return callback();
        }

        if (file.isBuffer()) {
            var $ = cheerio.load(file.contents.toString('UTF-8'), { decodeEntities: false } );
            $('img').each(function() {
                if (this.attribs['src']) {
                    var imageSrc = this.attribs['src'];
                    if(imageSrc && !imageSrc.match(uriRegex)) {
                        var imageName = imageSrc;
                        if (!keepOrigin) {
                            imageName = imageSrc.substring(imageSrc.lastIndexOf('/') + 1, imageSrc.length);
                        }
                        this.attribs['src'] = prependSrc + imageName;
                    }
                }
            });

            var output = $.html();

            file.contents = new Buffer(output);

            return callback(null, file);
        }
    });
};