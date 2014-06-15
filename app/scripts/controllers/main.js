'use strict';

angular.module('akaPenSenseiApp')
  .controller('MainCtrl', function ($scope, DbService) {
    $scope.images = ['https://avatars3.githubusercontent.com/u/1072879?s=140'];
    DbService.getAllImageSrcList().then(function (srcList) {
//      $scope.images = srcList;
    }, null, function(url){
      $scope.images.push(url);
    });
  });
