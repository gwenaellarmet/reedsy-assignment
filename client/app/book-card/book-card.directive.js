'use strict';

angular.module('reedsyAssignmentApp')
  .directive('bookCard', function () {
    return {
      templateUrl: 'app/book-card/book-card.html',
      restrict: 'EA',
      scope: {
        book : '='
      },
      link: function (scope, element, attrs) {
        scope.nbDaysSincePublished = moment().diff(moment(scope.book.published), 'years');
      }
    };
  });