describe('TodoService', function() {
    
  'use strict';

  var TodoService, httpBackend, rootScope, testUrl;

  function getRequest(params, result, resolve, reject) {
    var deferred = TodoService._makeGet(params);
    deferred.then(resolve, reject);
    httpBackend.expectGET(testUrl + testParams).respond(result);
    httpBackend.flush();
  }

  function postRequest(data, resolve, reject) {
    var deferred = TodoService._makePost(data);
    deferred.then(resolve, reject);
    httpBackend.expectPOST(testUrl, data).respond(result);
    httpBackend.flush();
  }

  beforeEach(module('ToDont'));

  beforeEach(inject(function(_TodoService_, $httpBackend, $rootScope) {
    testUrl = 'http://localhost:7999/todont.php';
    TodoService = _TodoService_;
    httpBackend = $httpBackend;
    rootScope = $rootScope;
  }));

  it('is defined', function() {
    expect(TodoService).toBeDefined();
    expect(TodoService.baseUrl).toBeDefined();
  });

  // _makeGet()
  it('performs a GET request and succeeds', function() {
    var testParams, deferred, returnData, response;
    testParams = '?key=value';
    returnData = {
      key: 'value'
    };
    deferred = TodoService._makeGet(testParams);
    deferred.then(
      function(data) {
        response = data;
      }
    );
    httpBackend.expectGET(testUrl + testParams).respond(returnData);
    httpBackend.flush();
    expect(response).toEqual(returnData);
  });

  it('performs a GET request and fails', function() {
    var testParams, deferred, returnData, response;
    testParams = '?key=value';
    returnData = {
      error: 'Error message'
    };
    deferred = TodoService._makeGet(testParams);
    deferred.then(
      null,
      function(data) {
        response = data;
      }
    );
    httpBackend.expectGET(testUrl + testParams).respond(returnData);
    httpBackend.flush();
    expect(response).toEqual(returnData);
  });

  // _makePost()
  it('performs a POST request', function() {

  });

});
