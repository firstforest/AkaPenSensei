'use strict';

angular.module('akaPenSenseiApp')
    .controller('PageCtrl', function ($scope) {
        $scope.totalItems = 64;
        $scope.currentPage = 1;
        $scope.pageChanged = function () {
            console.log($scope.totalItems, $scope.currentPage);
        }
    });
