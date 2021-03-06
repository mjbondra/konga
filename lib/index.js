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
  , sanitize = require('./konga/sanitize')
  , styles = require('./konga/styles')
  , templates = require('./konga/templates');

function *konga () {
  var activeDirectory = process.cwd();

  var kongaDirectories = yield {
    default: directories.defaultDirectory(),
    user: directories.userDirectory()
  };

  var kongaTemplates = yield templates(kongaDirectories);

  var actions = {
    async: [],
    new: function () {
      if (!arguments[0]) throw new Error(messages.missing.directory);
      if (!this.async.length) this.async.push(decode(
        kongaTemplates[
          arguments[1] ? sanitize.extension(arguments[1]) : 'default'
        ],
        path.join(activeDirectory, arguments[0])
      ));
    },
    save: function () {
      if (!arguments[0]) throw new Error(messages.missing.name);
      if (!this.async.length) this.async.push(encode(
        activeDirectory,
        path.join(kongaDirectories.user, 'templates', arguments[0])
      ));
    }
  };

  var args = process.argv.slice(2)
    , i = args.length;

  while (i--)
    if (typeof actions[args[i]] === 'function')
      actions[args[i]].apply(actions, args.slice(i + 1));

  if (!actions.async.length) throw new Error(messages.missing.argument);
  yield actions.async;
}

co(function *() {
  try {
    yield konga();
  } catch (err) {
    console.error(styles.error(err));
    process.exit(1);
  }
})();
