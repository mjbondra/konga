'use strict';

var angular = require('angular');

require('./google-analytics');

angular.module('app.components', [
  'app.components.google-analytics'
]);
