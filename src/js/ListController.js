(function(global, $, ng) {
	
	'use strict';

  global.ToDont.controller('ListController', ['$scope', 'TodoService', function($scope, TodoService) {

    $scope.items = [];
    $scope.newItem = '';

    $scope.getItems = function() {
      TodoService.get().then(
        function(data) {
          $scope.items = data;
        },
        function(error) {
          console.error(error);
        }
      );
    };

    $scope.completeItem = function(item) {
      item.complete = !item.complete;
      TodoService.update(item).then(
        null,
        function(error) {
          item.complete = !item.complete;
          console.error(error);
        }
      );
    };

    $scope.addItem = function() {
      var item = {
        desc: $scope.newItem,
        complete: false
      };
      $scope.items.push(item);
      TodoService.add(item).then(
        null,
        function(error) {
          $scope.items.pop();
          console.error(error);
        }
      );
      $scope.newItem = '';
    };

    $scope.deleteItem = function(item) {
      var deleted;
      $scope.items.forEach(function(cur, i, arr) {
        if (cur.id === item.id) {
          deleted = $scope.items.splice(i, 1);
        }
      });
      TodoService.delete(item).then(
        null,
        function(error) {
          $scope.items.push(deleted);
          console.log(error);
        }
      );
    };

    $scope.getItems();

  }]);

})(window, jQuery, angular);
