/*
* app.js
*
* Initialize the ToDont app
*/
(function(global, $, ng) {
    
  'use strict';

  global.ToDont = ng.module('ToDont', []);

  global.ToDont.constant('Config', {
    API_BASE_URL: 'API_BASE_URL'
  });

})(window, jQuery, angular);
