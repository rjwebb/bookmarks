'use strict';

angular.module('bookmarksApp')
  .controller('MainController', ['$http', '$scope', 'socket', function ($http, $scope, socket) {
    this.$http = $http;
    this.bookmarks = [];
    this.formBookmark = {};

    $http.get('/api/bookmarks').then(response => {
      this.bookmarks = response.data;
      socket.syncUpdates('bookmark', this.bookmarks);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('bookmark');
    });


    this.addBookmark = function () {
      console.log(this.formBookmark);
      if(this.formBookmark.name && this.formBookmark.url){
	this.$http.post('/api/bookmarks', {
	  name: this.formBookmark.name,
	  url: this.formBookmark.url
	});

	this.formBookmark = {};
      }
    }

    this.removeBookmark = function (bookmark) {
      this.$http.delete('/api/bookmarks/'+ bookmark._id);
    }
  }]);
