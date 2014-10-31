var comments = require('../components/comments/controllers')
  , email = require('../middleware/email');

module.exports = function (app) {
  app.get('/api/comments', comments.index);
};
