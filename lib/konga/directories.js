var fs = require('co-fs')
  , path = require('path');

var defaultRoot = path.join(__dirname, '../..', '.konga')
  , defaultTemplates = path.join(defaultRoot, 'templates')
  , userRoot = path.join(process.env.HOME || process.env.USERPROFILE, '.konga')
  , userTemplates = path.join(userRoot, 'templates');

function *verifyDirectory (dir) {
  if (!(yield fs.exists(dir)))
    yield fs.mkdir(dir);
}

exports.defaultDirectory = function *() {
  yield verifyDirectory(defaultRoot);
  yield verifyDirectory(defaultTemplates);
  return defaultRoot;
};

exports.userDirectory = function *() {
  yield verifyDirectory(userRoot);
  yield verifyDirectory(userTemplates);
  return userRoot;
};
