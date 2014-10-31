'use strict';

var angular = require('angular');

require('./directives');
require('./services');

angular.module('app.components.google-analytics', [
  'app.components.google-analytics.directives',
  'app.components.google-analytics.services'
]);
