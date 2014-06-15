'use strict';

angular.module('akaPenSenseiApp')
  .controller('MainCtrl', function ($scope, DbService, TargetContent) {
    $scope.images = ['https://avatars3.githubusercontent.com/u/1072879?s=140'];
    DbService.getAllImageSrcList().then(function (srcList) {
    }, null, function(url){
      $scope.images.push(url);
    });
    $scope.setImage = function(image){
      TargetContent.src = image;
    }
  });
