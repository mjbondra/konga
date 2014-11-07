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
  , path = require('path')
  , templates = require('./konga/templates');

co(function *() {
  var kongaDirectories = yield {
    default: directories.defaultDirectory(),
    user: directories.userDirectory()
  };
  var kongaTemplates = yield templates(kongaDirectories);

  var args = process.argv.splice(2)
    , i = args.length;

  while (i--) {
    switch (args[i]) {
      case 'new':
        if (!args[i+1]) {
          console.error('Include a directory name for your project.\n');
          console.error('Example: konga new example');
          console.error('Example: konga new example default\n');
          continue;
        }
        yield decode(
          kongaTemplates[
            args[i+2] ? args[i+2].replace(/\.json/, '') : 'default'
          ],
          process.cwd()
        );
        break;

      case 'save':
        if (!args[i+1]) {
          console.error('Include a name for your template.\n');
          console.error('Example: konga save my_new_template\n');
          continue;
        }
        yield encode(
          process.cwd(),
          path.join(
            kongaDirectories.user, 'templates', args[i+1]
          )
        );
        break;
    }
  }
})();
