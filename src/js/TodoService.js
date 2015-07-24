(function(global, $, ng) {
	
	'use strict';

	global.ToDont.service('TodoService', ['$http', '$q', function($http, $q) {

    this.baseUrl = 'http://localhost:7999/todont.php';

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

    this._makePost = function(data) {
      var deferred = $q.defer();
      $http.post(this.baseUrl, data, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function(data) {
        if (data.success === true) {
          if (data.success) {
            deferred.resolve(data);
          }
          else {
            deferred.reject(data);
          }
        }
      }).error(function(data) {
        deferred.reject(data);
      });
      return deferred.promise;
    };

    this.get = function() {
      return this._makeGet('?method=get');
    };

    this.update = function(item) {
      return this._makePost({
        method: 'update',
        item: item
      });
    };

    this.add = function(item) {
      return this._makePost({
        method: 'add',
        item: item
      });
    };

    this.delete = function(item) {
      return this._makePost({
        method: 'delete',
        item: item
      });
    };

  }]);

})(window, jQuery, angular);
