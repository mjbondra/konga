var fs = require('co-fs')
  , path = require('path')
  , sanitize = require('./sanitize');

function *readFile (src) {
  var fileString = yield fs.createReadStream(src);
  return fileString ? fileString.toString() : '';
}

function *directoryToJson (src) {
  var files = yield fs.readdir(src)
    , i = files.length
    , template = {};

  while (i--) {
    var stats = yield fs.lstat(path.join(src, files[i]));
    if (stats.isFile())
      template[files[i]] = yield readFile(path.join(src, files[i]));
    else if (stats.isDirectory())
      template[files[i]] = yield directoryToJson(path.join(src, files[i]));
  }
  return template;
}

module.exports = function *(src, dest) {
  dest = sanitize.extension(dest);
  yield fs.writeFile(dest, JSON.stringify(yield directoryToJson(src)));
};
