var fs = require('co-fs')
  , path = require('path');

function *writeFile () {

}

function *jsonToDirectory () {
  yield writeFile();
}

module.exports = function *(src, dest) {
  yield jsonToDirectory();
};
