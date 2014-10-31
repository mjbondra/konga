'use strict';

var angular = require('angular');

// App Dependencies
require('./components');
require('./services');

// AngularJS/App modules
angular.module('app', [
  'app.components',
  'app.services'
]);
