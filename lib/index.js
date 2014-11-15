/**
 *  #    #
 *  #   #   ####  #    #  ####    ##
 *  #  #   #    # ##   # #    #  #  #
 *  ###    #    # # #  # #      #    #
 *  #  #   #    # #  # # #  ### ######
 *  #   #  #    # #   ## #    # #    #
 *  #    #  ####  #    #  ####  #    #
 *
*/

var co = require('co')
  , decode = require('./konga/decode')
  , encode = require('./konga/encode')
  , directories = require('./konga/directories')
  , messages = require('./konga/messages')
  , path = require('path')
  , templates = require('./konga/templates');

function *konga () {
  var currentDirectory = process.cwd();

  var kongaDirectories = yield {
    default: directories.defaultDirectory(),
    user: directories.userDirectory()
  };

  var kongaTemplates = yield templates(kongaDirectories);

  var actions = {
    deferred: [],
    new: function () {
      if (!arguments[0]) throw new Error(messages.missing.directory);
      if (!this.deferred.length) this.deferred.push(decode(
        kongaTemplates[
          arguments[1] ? arguments[1].replace(/\.json/i, '') : 'default'
        ],
        path.join(currentDirectory, arguments[0])
      ));
    },
    save: function () {
      if (!arguments[0]) throw new Error(messages.missing.name);
      if (!this.deferred.length) this.deferred.push(encode(
        currentDirectory,
        path.join(kongaDirectories.user, 'templates', arguments[0])
      ));
    }
  };

  var args = process.argv.slice(2)
    , i = args.length;

  while (i--)
    if (typeof actions[args[i]] === 'function')
      actions[args[i]].apply(actions, args.slice(i + 1));

  if (!actions.deferred.length) throw new Error(messages.missing.argument);
  yield actions.deferred;
}

co(function *() {
  try {
    yield konga();
  } catch (err) {
    console.error(err);
  }
})();
