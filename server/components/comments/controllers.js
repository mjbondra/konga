var mongoose = require('mongoose')
  , Bluebird = require('bluebird');

var Comment = mongoose.model('Comment');

exports.index = function *() {
  this.body = yield Bluebird.promisify(Comment.find, Comment)();
};
