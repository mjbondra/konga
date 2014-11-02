'use strict';

var angular = require('angular');

// App Dependencies
require('./components');
require('./config');

// AngularJS/App modules
angular.module('app', [
  'app.components',
  'app.config'
]);
