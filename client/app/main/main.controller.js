'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.bookmarks = [];
    this.form_bookmark = {};

    $scope.lol = 10013013;

    $http.get('/api/bookmarks').then(response => {
      this.bookmarks = response.data;
      socket.syncUpdates('bookmark', this.bookmarks);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('bookmark');
    });
  }

  addBookmark() {
    if(this.form_bookmark.name && this.form_bookmark.url){
      this.$http.post('/api/bookmarks', {
	name: this.form_bookmark.name,
	url: this.form_bookmark.url
      });

      this.form_bookmark = {};
    }
  }
}

angular.module('bookmarksApp')
  .controller('MainController', MainController);

})();
