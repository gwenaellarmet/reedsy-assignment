'use strict';

angular.module('reedsyAssignmentApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('book', {
        url: '/book/:id',
        templateUrl: 'app/book/book.html',
        controller: 'BookCtrl'
      });
  });