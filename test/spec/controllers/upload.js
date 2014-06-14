'use strict';

describe('Controller: UploadCtrl', function () {

  // load the controller's module
  beforeEach(module('akaPenSenseiApp'));

  var UploadCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UploadCtrl = $controller('UploadCtrl', {
      $scope: scope
    });
  }));

  describe('upload', function () {
    it('タイトルとデスクリプションと画像FileをdbServiceに渡す', function () {
      expect(scope.upload()).to.be.false;
    });
  });
});
