var fs = require('co-fs')
  , messages = require('./messages')
  , path = require('path');

var defaultRoot = path.join(__dirname, '../..')
  , defaultTemplates = path.join(defaultRoot, 'templates')
  , userRoot = path.join(process.env.HOME || process.env.USERPROFILE, '.konga')
  , userTemplates = path.join(userRoot, 'templates');

function *verifyDirectory (dir) {
  if (!(yield fs.exists(dir)))
    yield fs.mkdir(dir);
}

function *verifyEmptyDirectory (dir) {
  if (yield fs.exists(dir))
    throw new Error(messages.notEmpty.directory(dir));

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

exports.verifyDirectory = verifyDirectory;
exports.verifyEmptyDirectory = verifyEmptyDirectory;
