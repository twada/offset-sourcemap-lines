offset-sourcemap-lines
================================

Offset each generated lines in SourceMap

[![Build Status][travis-image]][travis-url]
[![NPM version][npm-image]][npm-url]
[![Dependency Status][depstat-image]][depstat-url]
[![License][license-image]][license-url]


DESCRIPTION
---------------------------------------

`offset-sourcemap-lines` is a module to generate new [SourceMap](https://github.com/mozilla/source-map/) object from original SourceMap with specified offset for each generated lines applied.


API
---------------------------------------

### var offsettedMap = offsetLines(originalMap, offset)

```js
var offsetLines = require('offset-sourcemap-lines');
var conv = require('convert-source-map');
var fs = require('fs');

var codeWithSourceMapComment = fs.readFileSync('/path/to/code-with-sourcemap-comment.js', 'utf-8');
var originalMap = conv.fromSource(codeWithSourceMapComment).toObject();

var header = '/**\n * \n * YOUR\n * CODE\n * HEADER\n */\n';
var offset = header.match(/\n/g).length;

var offsettedMap = offsetLines(originalMap, offset);

var codeBody = conv.removeComments(codeWithSourceMapComment);
var newSourceMapComment = conv.fromObject(offsettedMap).toComment();
console.log(header + codeBody + '\n' + newSourceMapComment);
```


INSTALL
---------------------------------------

```
$ npm install offset-sourcemap-lines
```


AUTHOR
---------------------------------------
* [Takuto Wada](https://github.com/twada)


LICENSE
---------------------------------------
Licensed under the [MIT](https://twada.mit-license.org/) license.

[npm-url]: https://npmjs.org/package/offset-sourcemap-lines
[npm-image]: https://badge.fury.io/js/offset-sourcemap-lines.svg

[travis-url]: https://travis-ci.org/twada/offset-sourcemap-lines
[travis-image]: https://secure.travis-ci.org/twada/offset-sourcemap-lines.svg?branch=master

[depstat-url]: https://gemnasium.com/twada/offset-sourcemap-lines
[depstat-image]: https://gemnasium.com/twada/offset-sourcemap-lines.svg

[license-url]: https://twada.mit-license.org/2016-2018
[license-image]: https://img.shields.io/badge/license-MIT-brightgreen.svg
