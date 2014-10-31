var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var CommentSchema = new Schema({
  body: String,
  email: String
});

mongoose.model('Comment', CommentSchema);
