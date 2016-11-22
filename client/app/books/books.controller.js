'use strict';

angular.module('reedsyAssignmentApp')
  .controller('BooksCtrl', function ($scope, $http, $stateParams) {

    var originBooks = [];

    $scope.books = [];
    $scope.category = $stateParams.category || "";
    $scope.about = $stateParams.about || "";
    $scope.search = "";
    $scope.itemNb = 10;
    $scope.categories = [];
    $scope.abouts = [];

    $scope.applyFilters = applyFilters;

    activate();

    function activate () {
      $http.get('/api/books').success(function(books) {
        $scope.books = _.sortBy(books, 'name');
        originBooks = books;

        $scope.categories = _.uniq(_.map(_.map(books, 'genre'), 'category'));
        $scope.abouts     = _.uniq(_.map(_.map(books, 'genre'), 'name'));

        if ( $scope.category != "" || $scope.about != "") {
          applyFilters();
        }
      });
    }

    function applyFilters () {
      $scope.books = originBooks;
      
      if($scope.search && $scope.search != "") {
        $scope.books = _.filter($scope.books, function(o) {
          return o.name.toLowerCase().includes($scope.search.toLowerCase());
        });
      }    
      if($scope.category && $scope.category != "") {
        $scope.books = _.filter($scope.books, function(o) {
          return o.genre.category == $scope.category;
        });
      }      
      if($scope.about && $scope.about != "") {
        $scope.books = _.filter($scope.books, function(o) {
          return o.genre.name == $scope.about;
        });
      }

      $scope.books = _.sortBy($scope.books, 'name');
    }
  });
