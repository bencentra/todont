(function(global, $, ng) {
	
	'use strict';

  global.ToDont.controller('ListController', ['$scope', 'TodoService', function($scope, TodoService) {

    $scope.items = [
      { desc: 'Crash my car', complete: false },
      { desc: 'Spend all my money', complete: false },
      { desc: 'Get (too) drunk', complete: true }
    ];
    $scope.newItem = "";

    $scope.getItems = function() {
      TodoService.get();
    };

    $scope.complete = function(item) {
      item.complete = !item.complete;
      TodoService.update(item);
    };

    $scope.getItems();

  }]);

})(window, jQuery, angular);
