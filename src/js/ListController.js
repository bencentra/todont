/*
* ListController.js
*
* Main controller for the to-do list
*/
(function(global, $, ng) {
	
	'use strict';

  global.ToDont.controller('ListController', ['$scope', '$timeout', 'TodoService', function($scope, $timeout, TodoService) {

    $scope.items = [];        // Array of to-do items
    $scope.newItem = '';      // New item to add to the list
    $scope.errorMsg = false;  // Error message

    // Get a list of saved items
    $scope.getItems = function() {
      TodoService.get().then(
        function(response) {
          $scope.items = response.data.items;
        },
        function(error) {
          $scope.errorMsg = error.error;
        }
      );
    };

    // Toggle the complete status of an item
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

    // Add a new item to the list
    $scope.addItem = function() {
      if ($scope.newItem === '') {
        return;
      }
      var item = {
        desc: $scope.newItem
      };
      TodoService.add(item).then(
        function(response) {
          $scope.newItem = '';
          $scope.items = response.data.items;
        },
        function(error) {
          $scope.items.pop();
          $scope.errorMsg = error.error;
        }
      );
    };

    // Delete an item from the list
    $scope.deleteItem = function(item) {
      if ($scope.items.indexOf(item) === -1) {
        return;
      }
      TodoService.delete(item).then(
        function(response) {
          $scope.items = response.data.items;
        },
        function(error) {
          $scope.errorMsg = error.error;
        }
      );
    };

    // Can this $timeout be removed?
    $timeout(function() {
      $scope.getItems();
    });
    
  }]);

})(window, jQuery, angular);
