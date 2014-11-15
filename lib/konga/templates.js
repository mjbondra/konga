var fs = require('co-fs')
  , path = require('path')
  , sanitize = require('./sanitize');

function *getTemplates (src, templates) {
  if (!(yield fs.exists(src)))
    return templates;

  var files = yield fs.readdir(src)
    , i = files.length;

  while (i--) {
    templates[sanitize.extension(files[i])] = path.join(src, files[i]);
  }
  return templates;
}

module.exports = function *(directories) {
  var templates = {}
    , k = Object.keys(directories).reverse()
    , i = k.length;

  while (i--) {
    var activePath = path.join(directories[k[i]], 'templates');

    templates = yield getTemplates(activePath, templates);
  }
  return templates;
};
