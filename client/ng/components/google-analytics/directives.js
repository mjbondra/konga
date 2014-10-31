'use strict';

var angular = require('angular')
  , app = angular.module('app.components.google-analytics.directives', []);

app.directive('googleAnalytics', ['$location', 'ga', function ($location, ga) {
  return {
    link: function (scope) {
      ga('create', scope.googleAnalytics, 'auto');
      ga('send', 'pageview');
    },
    scope: {
      googleAnalytics: '@'
    }
  };
}]);
