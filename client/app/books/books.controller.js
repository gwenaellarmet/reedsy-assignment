'use strict';

angular.module('reedsyAssignmentApp')
  .controller('BooksCtrl', function ($scope, $http) {
    $scope.message = 'Hello';

    $scope.books = [];

    $scope.category; //contain category choosen by user
    $scope.about; //contain category choosen by user

    $http.get('/api/books').success(function(books) {
      $scope.books = books;
    });

    $scope.categories = [
      'Fiction',
      'Non-Fiction'
    ];

    $scope.abouts = [
      'Comics',
      'Romance'
    ]
  });
