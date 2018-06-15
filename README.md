# gulp-replace-image-src [![Build Status](https://travis-ci.org/GloriousFt/gulp-replace-image-src.svg?branch=master)](https://travis-ci.org/GloriousFt/gulp-replace-image-src)

> Replace the \"src\" attribute of \<img\> tags with specific path in HTML files. 

It is very easy to replace original "src" with a CDN "src".

## Installation

Install package with NPM and add it to your development dependencies:

`npm install --save-dev gulp-replace-image-src`

## Usage

```javascript
var rep = require('gulp-replace-image-src');
var gulp = require('gulp');

gulp.task('replace', function() {
  gulp.src('*.html')
    .pipe(rep({
      prependSrc : '//github.cdn.com/images/',
      keepOrigin : false
    }))
    .pipe(gulp.dest('dist'));
});
```
The original HTML is like:
```html
<body>
  <div class="icon1"><img src="/public/icon4.png" /></div>
  <div class="icon1_1"><img src="../icon4-1.png" /></div>
</body>
```
After replaced, it should be like:
```html
<body>
  <div class="icon1"><img src="//github.cdn.com/images/icon4.png" /></div>
  <div class="icon1_1"><img src="//github.cdn.com/images/icon4-1.png" /></div>
</body>
```
The plugin only keeps the original file name in the new path.

If you want to keep origin "src", then you can make `keepOrigin` `true`.

```javascript
var rep = require('gulp-replace-image-src');
var gulp = require('gulp');

gulp.task('replace', function() {
  gulp.src('*.html')
    .pipe(rep({
      prependSrc : '//github.cdn.com/images',
      keepOrigin : true
    }))
    .pipe(gulp.dest('dist'));
});
```
Then you will see the below HTML:
```html
<body>
  <div class="icon1"><img src="//github.cdn.com/images/public/icon4.png" /></div>
  <div class="icon1_1"><img src="//github.cdn.com/images/../icon4-1.png" /></div>
</body>
```

If the "src" starts with **"http:|ftp:|https:|//"**, then it will **NOT** be replaced.
## API

### replace(options)

Options, Type: `Object`.

#### options.prependSrc

Type:`String`

Default: `/`

Prepend the path string to every "src" attribute of "img" tag.  

#### options.keepOrigin

Type:`Boolean`

Default:`false`

If the value is `true`, then the new "src" is prepended to the origin "src".