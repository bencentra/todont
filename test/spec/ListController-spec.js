describe('ListController', function() {
    
  'use strict';

  var scope, controller, timeout, q, TodoService, mockTodoService;

  beforeEach(module('ToDont', function($provide) {

    // Mock out TodoSerivice
    mockTodoService = {
      get: function() {},
      update: function() {},
      add: function() {},
      delete: function() {}
    };
    $provide.value('TodoService', mockTodoService);

  }));

  describe('initialization', function() {

    beforeEach(inject(function($rootScope, $controller, $timeout, _TodoService_) {
      TodoService = _TodoService_;
      timeout = $timeout;
      scope = $rootScope.$new();
      controller = $controller('ListController', {
        $scope: scope,
        TodoService: TodoService
      });
    }));

    it('should define the $scope variables and methods', function() {
      scope.$apply();
      expect(scope.items).toEqual([]);
      expect(scope.newItem).toEqual('');
    });

    it('should get the initial list of items', function() {
      spyOn(scope, 'getItems');
      timeout.flush();
      expect(scope.getItems).toHaveBeenCalled();
    });

  });

  describe('$scope.getItems()', function() {

    var testItems = [
      {id:1,desc:'test item',complete:false}
    ];

    beforeEach(inject(function($rootScope, $controller, $q, _TodoService_) {
      TodoService = _TodoService_;
      q = $q;
      scope = $rootScope.$new();
      controller = $controller('ListController', {
        $scope: scope,
        TodoService: TodoService
      });
    }));

    it('should get the list of items from the service', function() {
      spyOn(TodoService, 'get').and.callFake(function() {
        var deferred = q.defer();
        deferred.resolve(testItems);
        return deferred.promise;
      });
      scope.$apply(function() {
        scope.getItems();
      });
      expect(TodoService.get).toHaveBeenCalled();
      expect(scope.items.length).toBe(testItems.length);
    });

    // negative test case here

  });

  describe('$scope.completeItem()', function() {

    var testItem = {id:1,desc:'test item',complete:false},
        testResponse = {success:true};

    beforeEach(inject(function($rootScope, $controller, $q, _TodoService_) {
      TodoService = _TodoService_;
      q = $q;
      scope = $rootScope.$new();
      controller = $controller('ListController', {
        $scope: scope,
        TodoService: TodoService
      });
    }));

    it('should toggle the complete status of the item', function() {
      spyOn(TodoService, 'update').and.callFake(function() {
        var deferred = q.defer();
        deferred.resolve(testResponse);
        return deferred.promise;
      });
      scope.$apply(function() {
        scope.completeItem(testItem);
      });
      expect(TodoService.update).toHaveBeenCalled();
      expect(testItem.complete).toBe(true);
    });

    // negative test case here

  });

  describe('$scope.addItem()', function() {
    
    var testItems = [{id:1,desc:'test item',complete:false}],
        testNewItem = 'test item 2',
        testResponse = {success:true};

    beforeEach(inject(function($rootScope, $controller, $q, _TodoService_) {
      TodoService = _TodoService_;
      q = $q;
      scope = $rootScope.$new();
      controller = $controller('ListController', {
        $scope: scope,
        TodoService: TodoService
      });
    }));

    it('should add a new item to $scope.items', function() {
      spyOn(TodoService, 'add').and.callFake(function() {
        var deferred = q.defer();
        deferred.resolve(testResponse);
        return deferred.promise;
      });
      scope.$apply(function() {
        scope.items = testItems;
        scope.newItem = testNewItem;
        scope.addItem();
      });
      expect(TodoService.add).toHaveBeenCalled();
      expect(scope.items.length).toBe(2);
      expect(scope.newItem).toBe('');
    });

    // negative test case here

  });

  describe('$scope.deleteItem()', function() {

    var testItems = [{id:1,desc:'test item',complete:false}],
        testItem = {id:1,desc:'test item',complete:false},
        testResponse = {success:true};

    beforeEach(inject(function($rootScope, $controller, $q, _TodoService_) {
      TodoService = _TodoService_;
      q = $q;
      scope = $rootScope.$new();
      controller = $controller('ListController', {
        $scope: scope,
        TodoService: TodoService
      });
    }));

    it('should delete the item from $scope.items', function() {
      spyOn(TodoService, 'delete').and.callFake(function() {
        var deferred = q.defer();
        deferred.resolve(testResponse);
        return deferred.promise;
      });
      scope.$apply(function() {
        scope.items = testItems;
        scope.deleteItem(testItem);
      });
      expect(TodoService.delete).toHaveBeenCalled();
      expect(scope.items.length).toBe(0);
    });

    // negative test case here

  });

});
