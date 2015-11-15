describe('TodoService', function() {
    
  'use strict';

  beforeEach(module('ToDont'));

  var TodoService, httpBackend, q, testUrl, testItem, testItems;

  beforeEach(inject(function(_TodoService_, $httpBackend, $q) {
    testUrl = 'API_BASE_URL';
    testItem = {id:1,desc:'test item',complete:false};
    testItems = [testItem];
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

  describe('get()', function() {

    it('gets the list of todo items', function() {
      var promise, response, result;
      promise = TodoService.get();
      promise.then(function(data) {
        result = data;
      });
      response = {
        success: true,
        data: {
          items: testItems
        }
      };
      httpBackend.expectGET(testUrl).respond(200, response);
      httpBackend.flush();
      expect(result).toEqual(response);
      expect(result.data.items).toEqual(testItems);
    });

    it('fails to get the todo items', function() {
      var promise, response, result, errorMessage;
      errorMessage = 'error message';
      promise = TodoService.get();
      promise.then(null, function(error) {
        result = error;
      });
      response = {
        error: errorMessage
      };
      httpBackend.expectGET(testUrl).respond(500, response);
      httpBackend.flush();
      expect(result).toEqual(response);
      expect(result.error).toEqual(errorMessage);
    });

  });

  describe('add()', function() {

    it('adds a new todo item', function() {
      var promise, response, result;
      promise = TodoService.add(testItem);
      promise.then(function(data) {
        result = data;
      });
      response = {
        success: true,
        data: {
          items: testItems
        }
      };
      httpBackend.expectPOST(testUrl).respond(200, response);
      httpBackend.flush();
      expect(result).toEqual(response);
      expect(result.data.items).toEqual(testItems);
    });

    it('fails to add the todo item', function() {
      var promise, response, result, errorMessage;
      errorMessage = 'errorMessage';
      promise = TodoService.add(testItem);
      promise.then(null, function(error) {
        result = error;
      });
      response = {
        error: errorMessage
      };
      httpBackend.expectPOST(testUrl).respond(500, response);
      httpBackend.flush();
      expect(result).toEqual(response);
      expect(result.error).toEqual(errorMessage);
    });

  });

  describe('update()', function() {

    it('updates the given todo item', function() {
      var promise, response, result;
      testItem.complete = true;
      promise = TodoService.update(testItem);
      promise.then(function(data) {
        result = data;
      });
      response = {
        success: true,
        data: {
          items: testItems
        }
      };
      httpBackend.expectPATCH(testUrl + testItem.id).respond(200, response);
      httpBackend.flush();
      expect(result).toEqual(response);
      expect(result.data.items).toEqual(testItems);
    });

    it('fails to update the todo item', function() {
      var promise, response, result, errorMessage;
      errorMessage = 'error message';
      testItem.complete = true;
      promise = TodoService.update(testItem);
      promise.then(null, function(error) {
        result = error;
      });
      response = {
        error: errorMessage
      };
      httpBackend.expectPATCH(testUrl + testItem.id).respond(404, response);
      httpBackend.flush();
      expect(result).toEqual(response);
      expect(result.error).toEqual(errorMessage);
    });

  });

  describe('delete()', function() {

    it('deletes the given todo item', function() {
      var promise, response, result;
      promise = TodoService.delete(testItem);
      promise.then(function(data) {
        result = data;
      });
      response = {
        success: true,
        data: {
          items: []
        }
      };
      httpBackend.expectDELETE(testUrl + testItem.id).respond(200, response);
      httpBackend.flush();
      expect(result).toEqual(response);
      expect(result.data.items).toEqual([]);
    });

    it('fails to delete the todo item', function() {
      var promise, response, result, errorMessage;
      errorMessage = 'error message';
      promise = TodoService.delete(testItem);
      promise.then(null, function(error) {
        result = error;
      });
      response = {
        error: errorMessage
      };
      httpBackend.expectDELETE(testUrl + testItem.id).respond(404, response);
      httpBackend.flush();
      expect(result).toEqual(response);
      expect(result.error).toEqual(errorMessage);
    });

  });

});
