'use strict';

describe('Service: bookmarkform', function () {

  // load the service's module
  beforeEach(module('bookmarksApp'));

  // instantiate service
  var bookmarkform, $httpBackend;
  beforeEach(inject(function ($injector) {
    bookmarkform = $injector.get('bookmarkform');
    bookmarkform.fields = {};
    $httpBackend = $injector.get('$httpBackend');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });


  describe('Method: addBookmark', function () {
    beforeEach(function (){
      $httpBackend.expectGET('app/main/main.html').respond(200, '');
    }

    it('addBookmark should not add a bookmark if name and url are missing', function() {
      bookmarkform.addBookmark();
    });

    it('addBookmark should not add a bookmark if only url is given', function() {
      bookmarkform.fields.url = "http://www.facebook.com";
      bookmarkform.addBookmark();
    });

    it('addBookmark should not add a bookmark if only name is given', function() {
      bookmarkform.fields.name = "Facebook";
      bookmarkform.addBookmark();
    });

    it('addBookmark should add a bookmark if name and url are given', function() {
      bookmarkform.fields.url = "http://www.facebook.com";
      bookmarkform.fields.name = "Facebook";
      bookmarkform.addBookmark();
      $httpBackend.expectPOST('/api/bookmarks').respond(200, '');
    });
  }

});
