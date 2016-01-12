offset-sourcemap-lines
================================

Offset each generated lines in SourceMap


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
Licensed under the [MIT](http://twada.mit-license.org/) license.
