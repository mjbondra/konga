var fs = require('co-fs')
  , path = require('path');

function *getVersion () {
  var packagePath = path.join(__dirname, '../..', 'package.json')
    , packageJson = JSON.parse(yield fs.createReadStream(packagePath));
  return packageJson.version;
}

module.exports = function *(dir) {
  var dest = path.join(dir, '.konga')
    , version = yield getVersion();
  yield fs.writeFile(dest, version);
};
