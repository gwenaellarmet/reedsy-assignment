'use strict';

angular.module('reedsyAssignmentApp')
  .controller('BookCtrl', function ($scope, $stateParams) {

    $scope.message =  $stateParams.id || 'not found';
  });
