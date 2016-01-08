'use strict';

angular.module('bookmarksApp.auth', [
  'bookmarksApp.constants',
  'bookmarksApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
