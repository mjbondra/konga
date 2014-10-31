'use strict';

var angular = require('angular');

require('./api');

angular.module('app.services', [
  'app.services.api'
]);
