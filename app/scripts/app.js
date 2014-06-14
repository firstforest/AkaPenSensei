'use strict';

angular.module('akaPenSenseiApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/page', {
                templateUrl: 'views/page.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
