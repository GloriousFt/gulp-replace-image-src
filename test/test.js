var gutil = require('gulp-util');
var mocha = require('mocha');
var assert = require('assert');
var fs = require('fs');
var path = require('path');


var replace = require('../index');

var read = function(name) {
	return fs.readFileSync(path.join(__dirname, name));
};

mocha.describe('prepends src in "img" tag of html', function() {
	it('prepends without origin "src" attribute', function() {
		var stream = replace({
			prependSrc: '/public/img/'
		});

		stream.write(new gutil.File({
			contents: read('index.html')
		}));

		stream.once('data', function (file) {
			var value1 = file.contents.toString('utf8').trim();
			var value2 = read('expected.html').toString('utf8').trim();
			assert.strictEqual(value1, value2);
		});
		stream.end();
	});
	it('prepends with origin "src" attribute', function() {
		var stream = replace({
			prependSrc: '/public/',
			keepOrigin: true
		});

		stream.write(new gutil.File({
			contents: read('index.html')
		}));

		stream.once('data', function (file) {
			var value1 = file.contents.toString('utf8').trim();
			var value2 = read('expected_origin.html').toString('utf8').trim();
			assert.strictEqual(value1, value2);
		});
		stream.end();
	});
});