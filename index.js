var express = require('express');
var jsonfile = require('jsonfile');
var bodyParser = require('body-parser');
var path = require('path');

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

// Setup the express server and middleware
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

function commonWriteHandler(res, err) {
  if (err) {
    res.status(500).send(err);
  }
  else {
    res.send({ success: true, data: data });
  }
}

// Serve client app
app.use('/', express.static('dist'));

// GET a list of all todos
app.get('/todos', function(req, res) {
  jsonfile.readFile(file, function(err, obj) {
    if (err) {
      jsonfile.writeFile(file, data, function(err) {
        commonWriteHandler(res, error);
      });
    }
    else {
      data = obj
      res.send({ success: true, data: data });
    }
  });
});
  
// POST a new todo item
app.post('/todos', function(req, res) {
  var desc = req.body.desc;
  var complete = req.body.complete || false;
  if (!desc) {
    res.status(400).send({ error: 'missing desc param' });
  }
  else {
    var newTodo = {
      desc: desc,
      complete: complete
    };
    if (addItem(newTodo)) {
      jsonfile.writeFile(file, data, function(err) {
        commonWriteHandler(res, err);
      });
    }
    else {
      res.status(500).send({ error: 'unable to add item' });
    }
  }
});

// PATCH an update to an existing todo item
app.patch('/todos/:id', function(req, res) {
  var id = req.params.id;
  var desc = req.body.desc;
  var complete = req.body.complete;
  if (!id) {
    res.status(400).send({ error: 'missing id param' });
  }
  if (!desc) {
    res.status(400).send({ error: 'missing desc param' });
  }
  else if (typeof complete === 'undefined') {
    res.status(400).send({ error: 'missing complete param' });
  }
  else {
    var newTodo = {
      desc: desc,
      complete: complete
    };
    var oldTodo = getItemById(id);
    if (!oldTodo) {
      res.status(404).send({ error: 'invalid todo id' });
    }
    else {
      if (updateItemById(id, newTodo)) {
        jsonfile.writeFile(file, data, function(err) {
          commonWriteHandler(res, err);
        });
      }
      else {
        res.status(500).sened({ error: 'unable to update item' });
      }
    }
  }
});
  
// DELETE a todo item
app.delete('/todos/:id', function(req, res) {
  var id = req.params.id;
  if (!id) {
    res.status(400).send({ error: 'missing id param' });
  }
  else {
    if (deleteItemById(id)) {
      jsonfile.writeFile(file, data, function(err) {
        commonWriteHandler(res, err);
      });
    }
    else {
      res.status(500).send({ error: 'unable to delete item' });
    }
  }
});

// Get config data
var server;
jsonfile.readFile('config.json', function(err, obj) {
  if (err) {
    console.log('Error reading config file');
  }
  else {
    // Start the express server
    server = app.listen(obj.port, function () {
      var host = server.address().address;
      var port = server.address().port;
      console.log('App listening at http://%s:%s', host, port);
    });
  }
})


