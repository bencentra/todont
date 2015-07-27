(function(global, $, ng) {
	
	'use strict';

  global.ToDont.controller('ListController', ['$scope', '$timeout', 'TodoService', function($scope, $timeout, TodoService) {

    $scope.items = [];
    $scope.newItem = '';
    $scope.errorMsg = false;

    $scope.getItems = function() {
      TodoService.get().then(
        function(data) {
          $scope.items = data;
        },
        function(error) {
          $scope.errorMsg = error.error;
        }
      );
    };

    $scope.completeItem = function(item) {
      item.complete = !item.complete;
      TodoService.update(item).then(
        null,
        function(error) {
          item.complete = !item.complete;
          $scope.errorMsg = error.error;
        }
      );
    };

    $scope.addItem = function() {
      if ($scope.newItem === '') {
        return;
      }
      var item = {
        desc: $scope.newItem,
        complete: false
      };
      $scope.items.push(item);
      TodoService.add(item).then(
        null,
        function(error) {
          $scope.items.pop();
          $scope.errorMsg = error.error;
        }
      );
      $scope.newItem = '';
    };

    $scope.deleteItem = function(item) {
      var deleted;
      $scope.items.forEach(function(cur, i, arr) {
        if (cur.id === item.id) {
          deleted = $scope.items.splice(i, 1);
          TodoService.delete(item).then(
            null,
            function(error) {
              $scope.items.push(deleted);
              $scope.errorMsg = error.error;
            }
          );
        }
      });
    };

    // Can this $timeout be removed?
    $timeout(function() {
      $scope.getItems();
    });
    
  }]);

})(window, jQuery, angular);
