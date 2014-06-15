'use strict';

describe('Service: Targetcontent', function () {

  // load the service's module
  beforeEach(module('akaPenSenseiApp'));

  // instantiate service
  var Targetcontent;
  beforeEach(inject(function (_Targetcontent_) {
    Targetcontent = _Targetcontent_;
  }));

  it('should do something', function () {
    expect(!!Targetcontent).toBe(true);
  });

});
