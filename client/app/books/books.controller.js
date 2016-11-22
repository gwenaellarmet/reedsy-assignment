'use strict';

angular.module('reedsyAssignmentApp')
  .controller('BooksCtrl', function ($scope, $http, $stateParams) {

    var nbPage, i;
    var itemPerPage   = 8;
    var originBooks   = [];

    $scope.search     = "";
    $scope.category   = $stateParams.category || "";
    $scope.about      = $stateParams.about || "";
    $scope.categories = [];
    $scope.books      = [];
    $scope.abouts     = [];
    $scope.pages      = [];
    $scope.datas;
    $scope.currentPage;

    $scope.applyFilters = applyFilters;
    $scope.changePage   = changePage;

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
        getNbPages();
        changePage(1);
      });
    }

    function getNbPages() {      
      nbPage = Math.ceil($scope.books.length / itemPerPage);
      $scope.pages = [];
      for(i = 0; i < nbPage; i++) {
        $scope.pages.push(i+1);
      }
    }

    function changePage(page) {
      $scope.currentPage = page;
      $scope.datas = $scope.books.slice(($scope.currentPage - 1)* itemPerPage, $scope.currentPage * itemPerPage);
    }

    function applyFilters () {
      $scope.books = originBooks;
      
      if($scope.search && $scope.search != "") {
        $scope.books = _.filter($scope.books, function(o) {
          return o.name.toLowerCase().includes($scope.search.toLowerCase())
              || o.author.name.toLowerCase().includes($scope.search.toLowerCase());
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
      getNbPages();
      changePage(1);
    }
  });
