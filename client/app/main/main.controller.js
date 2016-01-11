'use strict';

angular.module('bookmarksApp')
  .controller('MainController', ['$http', '$scope', 'socket', 'bookmarkform', function ($http, $scope, socket, bookmarkform) {
    this.$http = $http;
    $scope.bookmarkform = bookmarkform;

    this.bookmarks = [];

    $http.get('/api/bookmarks').then(response => {
      this.bookmarks = response.data;
      socket.syncUpdates('bookmark', this.bookmarks);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('bookmark');
    });
  }]);
