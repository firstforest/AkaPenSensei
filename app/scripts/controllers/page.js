'use strict';

angular.module('akaPenSenseiApp')
  .controller('PageCtrl', function ($scope, DbService, TargetContent) {
    $scope.totalItems = 64;
    $scope.currentPage = 1;
    $scope.comment = '';
    $scope.pageChanged = function () {
      console.log($scope.totalItems, $scope.currentPage);
    };
    $scope.src = TargetContent.src;
    function getAkapenData(){
      return $scope.getDataURL();
    }
    $scope.save = function () {
      var akapenData = {
        contentId: TargetContent.id,
        akapen: getAkapenData(),
        comment:$scope.comment
      };
      console.log(akapenData);
      DbService.saveAkapenData(akapenData);
    };
    $scope.akapenList = [];
    DbService.getAkapenDataList(TargetContent.id).then(null,null,function(akapenData){
      $scope.akapenList.push(akapenData);
    });

  });
