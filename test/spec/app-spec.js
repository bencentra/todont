describe('app.js', function() {

  beforeEach(module('ToDont'));

  it('should define the ToDont object', function() {
    expect(window.ToDont).toBeDefined();
    expect(window.ToDont.name).toBe('ToDont');
  });

  it('should define the Config constant', inject(function(Config) {
    expect(Config).toBeDefined();
    expect(Config.API_BASE_URL).toBe('API_BASE_URL');
  }));

});
