'use strict';

angular.module('akaPenSenseiApp')
  .controller('UploadCtrl', function ($scope, DbService) {
    $scope.title = '';
    $scope.description = '';
    $scope.targetFile = null;
    $scope.upload = function () {
      DbService.upload($scope.targetFile, $scope.title, $scope.description);
    };
  });
