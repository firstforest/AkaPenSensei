'use strict';

angular.module('akaPenSenseiApp')
  .controller('UploadCtrl', function ($scope, DbService) {
    $scope.title = '';
    $scope.description = '';
    var targetFile = null;
    $scope.uploadedImageUrl = '';
    $scope.upload = function () {
      DbService.upload(targetFile, $scope.title, $scope.description, function (url) {
        $scope.$apply(function () {
          $scope.uploadedImageUrl = url;
        });
      });
    };
    $scope.onFileSelect = function ($files) {
      targetFile = $files[0];
      console.log($files);
    };
  });
