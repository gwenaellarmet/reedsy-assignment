'use strict';

describe('Directive: bookCard', function () {

  // load the directive's module and view
  beforeEach(module('reedsyAssignmentApp'));
  beforeEach(module('app/book-card/book-card.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<book-card></book-card>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the bookCard directive');
  }));
});