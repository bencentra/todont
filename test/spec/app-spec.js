describe('app.js', function() {

  it('should define the ToDont object', function() {
    expect(window.ToDont).toBeDefined();
    expect(window.ToDont.name).toBe('ToDont');
  });

});
