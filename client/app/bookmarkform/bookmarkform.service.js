'use strict';

angular.module('bookmarksApp')
  .service('bookmarkform', ['$http', function ($http) {
    this.$http = $http;

    this.fields = {};

    this.addBookmark = function () {
      console.log(this.fields);
      if(this.fields.name && this.fields.url){
	this.$http.post('/api/bookmarks', {
	  name: this.fields.name,
	  url: this.fields.url
	});

	this.fields = {};
      }
    }

    this.removeBookmark = function (bookmark) {
      this.$http.delete('/api/bookmarks/'+ bookmark._id);
    }

  }]);
