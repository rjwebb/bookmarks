'use strict';

describe('Service: bookmarkform', function () {

  // load the service's module
  beforeEach(module('bookmarksApp'));

  // instantiate service
  var bookmarkform;
  beforeEach(inject(function (_bookmarkform_) {
    bookmarkform = _bookmarkform_;
  }));

  it('should do something', function () {
    expect(!!bookmarkform).toBe(true);
  });

});
