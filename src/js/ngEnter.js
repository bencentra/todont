/*
* ngEnter.js
*
* Directive for calling a function when the Enter key is pressed
*/
(function(global, $, ng) {
    
  'use strict';

  global.ToDont.directive('ngEnter', function() {

    // http://stackoverflow.com/questions/17470790/how-to-use-a-keypress-event-in-angularjs
    return function (scope, element, attrs) {
      element.bind('keydown keypress', function(e) {
        if (e.which === 13) {
          scope.$apply(function() {
            scope.$eval(attrs.ngEnter);
          });
          e.preventDefault();
        }
      });
    };

  });

})(window, jQuery, angular);
