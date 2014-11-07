var fs = require('co-fs')
  , path = require('path');

function *readFile (src) {
  return (yield fs.createReadStream(src)).toString();
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
  dest = dest.replace(/\.json/, '') + '.json'; // prevent: example.json.json
  yield fs.writeFile(dest, JSON.stringify(yield directoryToJson(src)));
};
