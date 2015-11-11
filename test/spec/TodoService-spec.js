describe('TodoService', function() {
    
  'use strict';

  beforeEach(module('ToDont'));

  var TodoService, httpBackend, q, testUrl, testItem;

  function getRequest(params, result, resolve, reject, code) {
    code = code || 200;
    var deferred = TodoService._makeGet(params);
    deferred.then(resolve, reject);
    httpBackend.expectGET(testUrl + params).respond(code, result);
    httpBackend.flush();
  }

  function postRequest(data, result, resolve, reject, code) {
    code = code || 200;
    var deferred = TodoService._makePost(data);
    deferred.then(resolve, reject);
    httpBackend.expectPOST(testUrl, data).respond(code, result);
    httpBackend.flush();
  }

  beforeEach(inject(function(_TodoService_, $httpBackend, $q) {
    testUrl = 'API_BASE_URL';
    testItem = {id:1,desc:'test item',complete:false};
    TodoService = _TodoService_;
    httpBackend = $httpBackend;
    q = $q;
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('initialization', function() {

    it('is defined', function() {
      expect(TodoService).toBeDefined();
      expect(TodoService.baseUrl).toBeDefined();
    });

  });

  describe('_makeGet()', function() {

    it('performs a GET request and succeeds', function() {
      var testParams, returnData, success, response;
      testParams = '?key=value';
      returnData = {
        key: 'value'
      };
      success = function(data) {
        response = data;
      };
      getRequest(testParams, returnData, success, null);
      expect(response).toEqual(returnData);
    });

    it('performs a GET request and fails', function() {
      var testParams, returnData, error, response;
      testParams = '?key=value';
      returnData = {
        error: 'Error message'
      };
      error = function(data) {
        response = data;
      };
      getRequest(testParams, returnData, null, error);
      expect(response).toEqual(returnData);
    });

    it('performs a GET request and encounters an error', function() {
      var testParams, returnData, error, response;
      testParams = '?key=value';
      returnData = '';
      error = function(data) {
        response = data;
      };
      getRequest(testParams, returnData, null, error, 500);
      expect(response).toEqual(returnData);
    });

  });

  describe('_makePost()', function() {

    it('performs a POST request and succeeds', function() {
      var testData, returnData, success, response;
      testData = {
        key: 'value'
      };
      returnData = {
        success: true
      };
      success = function(data) {
        response = data;
      };
      postRequest(testData, returnData, success, null);
      expect(response).toEqual(returnData);
    });

    it('performs a POST request and fails', function() {
      var testData, returnData, error, response;
      testData = {
        key: 'value'
      };
      returnData = {
        error: 'Error message'
      };
      error = function(data) {
        response = data;
      };
      postRequest(testData, returnData, null, error);
      expect(response).toEqual(returnData);
    });

    it('performs a POST request and encounters an error', function() {
      var testData, returnData, error, response;
      testData = {
        key: 'value'
      };
      returnData = '';
      error = function(data) {
        response = data;
      };
      postRequest(testData, returnData, null, error, 500);
      expect(response).toEqual(returnData);
    });

  });

  describe('get()', function() {

    it('should call _makeGet() and return a promise', function() {
      var deferred, result;
      deferred = q.defer();
      spyOn(TodoService, '_makeGet').and.returnValue(deferred.promise);
      result = TodoService.get();
      expect(TodoService._makeGet).toHaveBeenCalledWith('?method=get');
      expect(result).toEqual(deferred.promise);
    });

  });

  describe('update()', function() {

    it('should call _makePost() and return a promise', function() {
      var deferred, result;
      deferred = q.defer();
      spyOn(TodoService, '_makePost').and.returnValue(deferred.promise);
      result = TodoService.update(testItem);
      expect(TodoService._makePost).toHaveBeenCalledWith({
        method: 'update',
        item: testItem
      });
      expect(result).toEqual(deferred.promise);
    });

  });

  describe('add()', function() {

    it('should call _makePost() and return a promise', function() {
      var deferred, result;
      deferred = q.defer();
      spyOn(TodoService, '_makePost').and.returnValue(deferred.promise);
      result = TodoService.add(testItem);
      expect(TodoService._makePost).toHaveBeenCalledWith({
        method: 'add',
        item: testItem
      });
      expect(result).toEqual(deferred.promise);
    });

  });

  describe('delete()', function() {

    it('should call _makePost() and return a promise', function() {
      var deferred, result;
      deferred = q.defer();
      spyOn(TodoService, '_makePost').and.returnValue(deferred.promise);
      result = TodoService.delete(testItem);
      expect(TodoService._makePost).toHaveBeenCalledWith({
        method: 'delete',
        item: testItem
      });
      expect(result).toEqual(deferred.promise);
    });

  });

});
