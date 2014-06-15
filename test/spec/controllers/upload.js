'use strict';

describe('Controller: UploadCtrl', function () {

  // load the controller's module
  beforeEach(module('akaPenSenseiApp'));

  var UploadCtrl,
    scope,
    mockDb;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    mockDb = {
      upload: function (file, title, description) {
        mockDb.file = file;
        mockDb.title = title;
        mockDb.description = description;
      }
    };
    UploadCtrl = $controller('UploadCtrl', {
      $scope: scope,
      Db: mockDb
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
      expect(mockDb.title).to.be.eql(scope.title);
      expect(mockDb.description).to.be.eql(scope.description);
      expect(mockDb.file).to.be.eql(scope.targetFile);
    });
  });
});
