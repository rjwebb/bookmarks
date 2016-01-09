'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.bookmarks = [];

    $scope.lol = 10013013;

    $http.get('/api/bookmarks').then(response => {
      this.bookmarks = response.data;
      console.log(this.bookmarks);
      socket.syncUpdates('bookmark', this.bookmarks);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('bookmark');
    });

  }

}

angular.module('bookmarksApp')
  .controller('MainController', MainController);

})();
