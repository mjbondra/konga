var directories = require('./directories')
  , fs = require('co-fs')
  , path = require('path')
  , messages = require('./messages')
  , sanitize = require('./sanitize')
  , stamp = require('./stamp');


function *writeFile (src, dest) {
  yield fs.writeFile(dest, src);
}

function *jsonToDirectory (src, dest) {
  yield directories.verifyEmptyDirectory(dest);

  var k = Object.keys(src)
    , i = k.length;

  while (i--) {
    if (k[i] !== sanitize.key([k[i]]))
      throw new Error(messages.validation.key(k[i]));
    var pathActive = path.join(dest, k[i]);

    switch (typeof src[k[i]]) {
      case 'object':
        yield jsonToDirectory(src[k[i]], pathActive);
        break;
      case 'string':
        yield writeFile(src[k[i]], pathActive);
        break;
    }
  }
}

module.exports = function *(src, dest) {
  if (!src || !(yield fs.exists(src)))
    throw new Error(messages.missing.template(src));

  var srcBuffer = yield fs.createReadStream(src)
    , srcJson = srcBuffer ? JSON.parse(srcBuffer.toString()) : '';

  yield jsonToDirectory(srcJson, dest);
  yield stamp(dest);
};
