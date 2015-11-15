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

    // TODO: add negative test case

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

    // TODO: add negative test case

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

    // TODO: add negative test case

  });

  describe('delete()', function() {

    it('deletes the given todo item', function() {
      var promise, response, result;
      testItems = [];
      promise = TodoService.delete(testItem);
      promise.then(function(data) {
        result = data;
      });
      response = {
        success: true,
        data: {
          items: testItems
        }
      };
      httpBackend.expectDELETE(testUrl + testItem.id).respond(200, response);
      httpBackend.flush();
      expect(result).toEqual(response);
      expect(result.data.items).toEqual(testItems);
    });

    // TODO: add negative test case

  });

});
