'use strict';

angular.module('reedsyAssignmentApp')
  .controller('BookCtrl', function ($scope, $stateParams, $http) {
    var bookid = $stateParams.id;


    activate();

    function activate() {
        if (angular.isUndefined(bookid)) {
            $state.go('books');
        }

        $http.get('/api/books').success(function(books) {
            $scope.books = books;
            $scope.book = _.filter(books, function(o) { return o.id == bookid; })[0];
            $scope.relatedBooks = _.sample(_.filter(books, function(o) { 
                return o.genre.category == $scope.book.genre.category || o.genre.name == $scope.book.genre.name; 
            }), 3);
        });
    }
  });
