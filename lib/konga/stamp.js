var fs = require('co-fs')
  , path = require('path');

function getVersion () {
  var packagePath = path.join(__dirname, '../..', 'package.json')
    , packageJson = require(packagePath);
  return packageJson.version;
}

module.exports = function *(dir) {
  var stampPath = path.join(dir, '.konga');
  yield fs.writeFile(stampPath, getVersion());
};
