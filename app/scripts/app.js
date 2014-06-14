'use strict';

angular.module('akaPenSenseiApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ui.bootstrap'
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
            .otherwise({
                redirectTo: '/'
            });
    });
