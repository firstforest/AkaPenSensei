'use strict';

describe('Service: DbService', function () {

  // load the service's module
  beforeEach(module('akaPenSenseiApp'));

  // instantiate service
  var DbService;
  beforeEach(inject(function (_DbService_) {
    DbService = _DbService_;
  }));

  it('should do something', function () {
    expect(!!DbService).to.be.true;
  });

  describe('初期化処理', function(){
    expect(DbService.user).to.not.be.null;
  });

  describe('upload', function(){
//    it('KiiCloudにファイルを上げる')
  });

});
