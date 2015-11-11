var express = require('express');
var jsonfile = require('jsonfile');
var bodyParser = require('body-parser');

var file = 'items.json';
var data = {
  items: [
    {
      id: 1,
      desc: "Sample todo",
      complete: false
    }
  ]
};
var port = 11382;

// Initialize the express app
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); 

function getItemById(id) {
  id = +id;
  var item = false;
  for (var i = 0; i < data.items.length; i++) {
    if (id === data.items[i].id) {
      item = data.items[i];
      break;
    }
  }
  return item;
}

function addItem(item) {
  if (!item || !item.desc || typeof item.complete === 'undefined') {
    return false;
  }
  var lastItem = data.items[data.items.length - 1];
  if (lastItem) {
    item.id = lastItem.id + 1;
  }
  else {
    item.id = 1;
  }
  data.items.push(item);
  return item;
}

function updateItemById(id, item) {
  id = +id;
  var updated = false;
  for (var i = 0; i < data.items.length; i++) {
    if (id === data.items[i].id) {
      var oldItem = data.items[i];
      oldItem.desc = item.desc;
      oldItem.complete = item.complete;
      data.items[i] = oldItem;
      updated = true;
      break;
    }
  }
  return updated;
}

function deleteItemById(id) {
  id = +id;
  var deleted = false;
  for (var i = 0; i < data.items.length; i++) {
    if (id === data.items[i].id) {
      data.items.splice(i, 1);
      deleted = true;
      break;
    }
  }
  return deleted;
}

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
            res.status(404).send({ error: 'error: ' + error });
          }
          // Return the contents
          else {
            res.send({ success: true, data: data });
          }
        })
      }
      // Return the contents
      else {
        data = obj
        res.send({ success: true, data: data });
      }
    });
  })
  // POST a new todo item
  .post(function(req, res) {
    var todo = req.body.todo;
    if (!todo) {
      res.status(400).send({ error: 'missing todo param' });
    }
    else {
      todo = JSON.parse(todo);
      if (addItem(todo)) {
        jsonfile.writeFile(file, data, function(err) {
          if (err) {
            res.status(500).send({ error: 'error: ' + error });
          }
          else {
            res.send({ success: true, data: data });
          }
        });
      }
      else {
        res.status(500).send({ error: 'unable to add item' });
      }
    }
  })
  // PUT an update to an existing todo item
  .put(function(req, res) {
    var id = req.body.id;
    var newTodo = req.body.todo;
    if (!id) {
      res.status(400).send({ error: 'missing id param' });
    }
    else if (!newTodo) {
      res.status(400).send({ error: 'missing todo param' });
    }
    else {
      var todoObj = getItemById(id);
      if (!todoObj) {
        res.status(404).send({ error: 'invalid item id' });
      }
      else {
        newTodo = JSON.parse(newTodo);
        if (updateItemById(id, newTodo)) {
          jsonfile.writeFile(file, data, function(err) {
            if (err) {
              res.status(500).send({ error: 'error: ' + error });
            }
            else {
              res.send({ success: true, data: data });
            }
          });
        }
        else {
          res.status(500).sened({ error: 'unable to update item' });
        }
      }
    }
  })
  // DELETE a todo item
  .delete(function(req, res) {
    var id = req.body.id;
    if (!id) {
      res.status(400).send({ error: 'missing id param' });
    }
    else {
      if (deleteItemById(id)) {
        jsonfile.writeFile(file, data, function(err) {
          if (err) {
            res.status(500).send({ error: 'error: ' + error });
          }
          else {
            res.send({ success: true, data: data });
          }
        });
      }
      else {
        res.status(500).send({ error: 'unable to delete item' });
      }
    }
  });

// Start the express server
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});
