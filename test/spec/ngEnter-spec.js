describe('ngEnter directive', function() {

  'use strict';

  beforeEach(module('ToDont'));

  var testFixture = '<input type="text" ng-enter="enter()"/>',
      scope, compile, element, compiled, event;

  function initFixture() {
    scope.enter = function() {};
    spyOn(scope, 'enter');
    element = angular.element(testFixture);
    compiled = compile(element)(scope);
    scope.$digest();
  }

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();
    compile = $compile;
    initFixture();
  }));

  it('should call scope.enter() on enter key press', function() {
    event = $.Event('keypress', {which:13});
    $(compiled).trigger(event);
    scope.$digest();
    expect(scope.enter).toHaveBeenCalled();
  });

  it('should call scope.enter() on enter key down', function() {
    event = $.Event('keydown', {which:13});
    $(compiled).trigger(event);
    scope.$digest();
    expect(scope.enter).toHaveBeenCalled();
  });

  it('should not call scope.enter() on other key press', function() {
    event = $.Event('keypress', {which:42});
    $(compiled).trigger(event);
    scope.$digest();
    expect(scope.enter).not.toHaveBeenCalled();
  });

  it('should not call scope.enter() on other key down', function() {
    event = $.Event('keydown', {which:42});
    $(compiled).trigger(event);
    scope.$digest();
    expect(scope.enter).not.toHaveBeenCalled();
  });

});
