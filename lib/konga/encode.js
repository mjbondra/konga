var fs = require('co-fs')
  , path = require('path')
  , sanitize = require('./sanitize');

function *directoryToJson (src) {
  var files = yield fs.readdir(src)
    , i = files.length
    , template = {};

  while (i--) {
    var activeFile = files[i]
      , activePath = path.join(src, activeFile)
      , activeStats = yield fs.lstat(path.join(src, activeFile));

    if (activeStats.isFile())
      template[activeFile] = yield fs.readFile(activePath, {
        encoding: 'utf8'
      });
    else if (activeStats.isDirectory())
      template[activeFile] = yield directoryToJson(activePath);
  }
  return template;
}

module.exports = function *(src, dest) {
  dest = sanitize.extension(dest, '.json');
  yield fs.writeFile(dest, JSON.stringify(yield directoryToJson(src)));
};
