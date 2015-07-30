/*
* TodoService.js
*
* Service for interacting with the to-do list backend
*/
(function(global, $, ng) {
	
	'use strict';

	global.ToDont.service('TodoService', ['$http', '$q', function($http, $q) {

    // BaseURL for the API
    this.baseUrl = 'http://localhost:7999/todont.php';

    // Make a GET request
    this._makeGet = function(params) {
      var deferred = $q.defer();
      $http.get(this.baseUrl + params)
      .success(function(data) {
        if (!data.error) {
          deferred.resolve(data);
        }
        else {
          deferred.reject(data);
        }
      }).error(function(data) {
        deferred.reject(data);
      });
      return deferred.promise;
    };

    // Make a POST request
    this._makePost = function(data) {
      var deferred = $q.defer();
      $http.post(this.baseUrl, data, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function(data) {
        if (data.success === true) {
          deferred.resolve(data);
        }
        else {
          deferred.reject(data);
        }
      }).error(function(data) {
        deferred.reject(data);
      });
      return deferred.promise;
    };

    // Get the list of items
    this.get = function() {
      return this._makeGet('?method=get');
    };

    // Update an item
    this.update = function(item) {
      return this._makePost({
        method: 'update',
        item: item
      });
    };

    // Add a new item to the list
    this.add = function(item) {
      return this._makePost({
        method: 'add',
        item: item
      });
    };

    // Delete an item from the list
    this.delete = function(item) {
      return this._makePost({
        method: 'delete',
        item: item
      });
    };

  }]);

})(window, jQuery, angular);
