#!/usr/bin/env node

var path = require('path')
  , spawn = require('child_process').spawn
  , args = [path.join(__dirname, '..', 'lib/index.js')].concat(process.argv.slice(2));

spawn(process.argv[0], ['--harmony'].concat(args), { stdio: [0,1,2] });
