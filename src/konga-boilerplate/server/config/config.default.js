/**
 * Create a copy of this file and name it 'config.js'
 * - change values based on your local environment(s) 
 */

var path = require('path')
  , port = process.env.PORT || 3000
  , root = path.normalize(__dirname + '/../..');

module.exports = {
  development: {
    env: 'development',
    mongo: {
      host: 'localhost',
      db: 'konga_dev'
    },
    path: {
      root: root,
      static: root + '/client',
      tmp: root + '/tmp'
    },
    port: port,
    secrets: ['secretString']
  },
  test: {
    env: 'test',
    mongo: {
      host: 'localhost',
      db: 'konga_test'
    },
    path: {
      root: root,
      static: root + '/client',
      tmp: root + '/tmp'
    },
    port: port,
    secrets: ['secretString']
  },
  production: {
    env: 'production',
    mongo: {
      host: 'localhost',
      db: 'konga_prod'
    },
    path: {
      root: root,
      static: root + '/client',
      tmp: root + '/tmp'
    },
    port: port,
    secrets: ['secretString']
  },
};
