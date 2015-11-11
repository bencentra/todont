var express = require('express');
var jsonfile = require('jsonfile');
var bodyParser = require('body-parser');

var file = 'items.json';
var data = {
  items: []
};
var port = 11382;

// Initialize the express app
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); 

// Setup the /todos route
app.route('/todos')
  // GET a list of all todos
  .get(function(req, res) {
    // Read the file
    jsonfile.readFile(file, function(err, obj) {
      // If file doesn't exist, create it
      if (err) {
        jsonfile.writeFile(file, data, function(err) {
          // If the write failed, send an error
          if (err) {
            res.status(404).send({ error: 'dang, son' });
          }
          // Return the contents
          else {
            res.send(data);
          }
        })
      }
      // Return the contents
      else {
        data = obj
        res.send(data);
      }
    });
  })
  // POST a new todo item
  .post(function(req, res) {
    var todo = req.body.todo;
    if (!todo) {
      res.status(404).send({ error: 'missing todo param' });
    }
    else {
      res.send('POST! ' + todo);
    }
  })
  // PATCH an existing todo item
  .patch(function(req, res) {
    var id = req.body.id;
    if (!id) {
      res.status(404).send({ error: 'missing id param' });
    }
    else {
      res.send('PATCH! ' + id);
    }
  })
  // DELETE a todo item
  .delete(function(req, res) {
    var id = req.body.id;
    if (!id) {
      res.status(404).send({ error: 'missing id param' });
    }
    else {
      res.send('DELETE! ' + id);
    }
  });

// Start the express server
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});
