var fs = require('co-fs')
  , path = require('path');

function *getTemplates (src, templates) {
  if (!(yield fs.exists(src)))
    return templates;

  var files = yield fs.readdir(src)
    , i = files.length;

  while (i--) {
    templates[files[i].replace(/\.json/i, '')] = path.join(src, files[i]);
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
