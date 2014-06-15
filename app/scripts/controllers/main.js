'use strict';

angular.module('akaPenSenseiApp')
  .controller('MainCtrl', function ($scope, DbService, TargetContent) {
    $scope.contents = [
      {src: 'https://avatars3.githubusercontent.com/u/1072879?s=140'}
    ];
    DbService.getAllContentList().then(null, null, function (content) {
      $scope.contents.push(content);
    });
    $scope.setContent = function (content) {
      TargetContent.src = content.src;
      TargetContent.id = content.id;
    };
  });
