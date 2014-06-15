'use strict';

angular.module('akaPenSenseiApp')
  .controller('UploadCtrl', function ($scope, Db) {
    $scope.title = '';
    $scope.description = '';
    $scope.targetFile = null;
    $scope.upload = function () {
      Db.upload($scope.targetFile, $scope.title, $scope.description);
    };
  });
