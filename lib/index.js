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
  var kongaDirectories = yield {
    default: directories.defaultDirectory(),
    user: directories.userDirectory()
  };
  var kongaTemplates = yield templates(kongaDirectories);

  var args = process.argv.slice(2)
    , i = args.length;

  while (i--) {
    switch (args[i]) {
      case 'new':
        if (!args[i+1]) throw new Error(messages.missing.directory);
        yield decode(
          kongaTemplates[
            args[i+2] ? args[i+2].replace(/\.json/, '') : 'default'
          ],
          path.join(
            process.cwd(), args[i+1]
          )
        );
        break;

      case 'save':
        if (!args[i+1]) throw new Error(messages.missing.name);
        yield encode(
          process.cwd(),
          path.join(
            kongaDirectories.user, 'templates', args[i+1]
          )
        );
        break;
    }
  }
}

co(function *() {
  try {
    yield konga();
  } catch (err) {
    console.error(err.stack);
  }
})();
