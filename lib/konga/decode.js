var fs = require('co-fs')
  , path = require('path')
  , messages = require('./messages')
  , sanitize = require('./sanitize');


function *writeFile () {
  return;
}

function *jsonToDirectory (src, dest) {
  yield writeFile();
  return;
}

module.exports = function *(src, dest) {
  if (!src || !(yield fs.exists(src)))
    throw new Error(messages.missing.template);
  var srcBuffer = yield fs.createReadStream(src)
    , srcJson = srcBuffer ? JSON.parse(srcBuffer.toString()) : '';
  yield jsonToDirectory(srcJson, dest);
};
