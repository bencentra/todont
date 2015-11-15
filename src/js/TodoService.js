/*
* TodoService.js
*
* Service for interacting with the to-do list backend
*/
(function(global, $, ng) {
	
	'use strict';

	global.ToDont.service('TodoService', ['$http', '$q', 'Config', function($http, $q, Config) {

    // BaseURL for the API
    this.baseUrl = Config.API_BASE_URL;

    // Get the list of items
    this.get = function() {
      var deferred = $q.defer();
      $http({
        url: this.baseUrl,
        method: "GET"
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

    // Add a new item to the list
    this.add = function(item) {
      var deferred = $q.defer();
      $http({
        url: this.baseUrl,
        method: "POST",
        data: item
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

    // Update an item
    this.update = function(item) {
      var deferred = $q.defer();
      $http({
        url: this.baseUrl + item.id,
        method: "PATCH",
        data: item
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

    // Delete an item from the list
    this.delete = function(item) {
      var deferred = $q.defer();
      $http({
        url: this.baseUrl + item.id,
        method: "DELETE"
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

  }]);

})(window, jQuery, angular);
