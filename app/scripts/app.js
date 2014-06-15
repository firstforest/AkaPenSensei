'use strict';

angular.module('akaPenSenseiApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'angularFileUpload'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/page', {
        templateUrl: 'views/page.html',
        controller: 'PageCtrl'
      })
      .when('/upload', {
        templateUrl: 'views/upload.html',
        controller: 'UploadCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
