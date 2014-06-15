'use strict';

describe('Controller: UploadCtrl', function () {

  // load the controller's module
  beforeEach(module('akaPenSenseiApp'));

  var UploadCtrl,
    scope,
    mockDbService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    mockDbService = {
      upload: function (file, title, description) {
        mockDbService.file = file;
        mockDbService.title = title;
        mockDbService.description = description;
      }
    };
    UploadCtrl = $controller('UploadCtrl', {
      $scope: scope,
      DbService: mockDbService
    });
  }));

  it('初期値', function () {
    expect(scope.title).to.be.eq('');
    expect(scope.description).to.be.eq('');
    expect(scope.targetFile).to.be.null;
  });

  describe('upload', function () {
    it('タイトルとデスクリプションと画像FileをdbServiceに渡す', function () {
      scope.title = 'title';
      scope.description = 'description';
      var file = new Blob(['Hello Blob', {type: 'text/plain'}]);
      scope.targetFile = file;
      scope.upload();
      expect(mockDbService.title).to.be.eql(scope.title);
      expect(mockDbService.description).to.be.eql(scope.description);
      expect(mockDbService.file).to.be.eql(scope.targetFile);
    });
  });
});
