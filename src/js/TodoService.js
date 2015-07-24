(function(global, $, ng) {
	
	'use strict';

	global.ToDont.service('TodoService', ['$http', '$q', function($http, $q) {

    this.get = function() {
      console.log("get");
    };

    this.update = function(item) {
      console.log("update");
    };

  }]);

})(window, jQuery, angular);
