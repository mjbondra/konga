'use strict';

var angular = require('angular')
  , app = angular.module('app.services.api', []);

/**
 * API Service
 *
 * @param {string} url - url of api resource
 * @param {object} opts - options for $http
 * @return {promise} - a promise for the data returned by a given url
 */
app.factory('api', ['$http', function ($http) {
  return function (url, opts) {
    opts = opts || {};
    opts.url = url || '/';
    opts.method = opts.method || 'GET';
    opts.params = opts.params || {};
    opts.params._t = new Date().getTime();
    return $http(opts);
  };
}]);
