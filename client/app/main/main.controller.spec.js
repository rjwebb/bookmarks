'use strict';

describe('Controller: MainController', function () {

  // load the controller's module
  beforeEach(module('bookmarksApp'));

  var createController, $controller, $httpBackend, $rootScope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    $controller = $injector.get('$controller');

    $httpBackend.when('GET', '/api/bookmarks')
      .respond( { data: [] });

    createController = function() {
      return $controller('MainController', { $scope: $rootScope });
    };
  }));

  it('should request the bookmarks when the page is loaded', function () {
    var controller = createController();
    console.log($rootScope);
    $httpBackend.flush();
  });

});
