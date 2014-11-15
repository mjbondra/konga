var directories = require('./directories')
  , fs = require('co-fs')
  , path = require('path')
  , messages = require('./messages')
  , sanitize = require('./sanitize')
  , stamp = require('./stamp');

function *jsonToDirectory (value, dest) {
  yield directories.verifyEmptyDirectory(dest);

  var typeMethods = {
    object: function *(_value, _dest) {
      yield jsonToDirectory(_value, _dest);
    },
    string: function *(_value, _dest) {
      yield fs.writeFile(_dest, _value);
    }
  };

  var k = Object.keys(value)
    , i = k.length;

  while (i--) {
    if (k[i] !== sanitize.key([k[i]]))
      throw new Error(messages.validation.key(k[i]));

    var activePath = path.join(dest, k[i])
      , activeType = typeof value[k[i]]
      , activeValue = value[k[i]];

    if (typeof typeMethods[activeType] === 'function')
      yield typeMethods[activeType](activeValue, activePath);
  }
}

module.exports = function *(src, dest) {
  if (typeof src !== 'string' || !(yield fs.exists(src)))
    throw new Error(messages.missing.template(src));

  yield jsonToDirectory(require(src), dest);
  yield stamp(dest);
};
