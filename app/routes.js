var Todo = require('./models/todo');

module.exports = function(app) {
  // api ==============================================
  app.get( '/api/todos', function(req,res) {
    Todo.find( function(err,todos) {
      if (err) 
	res.send(err)
      res.json(todos);  // return todos in json format
    }); 
  });

  app.post( '/api/todos', function(req,res) {
    // Create a todo, info coming from Angular AJAX
    Todo.create({
      text: req.body.text,
      done: false
    }, function(err,todo) {
      if (err)
	res.send(err);
      // find and return all todos after creating a new one
      Todo.find(function(err,todos) {
	if (err)
	  res.send(err)
	res.json(todos);
      });
    });
  });

  app.delete( '/api/todos/:todo_id', function( req, res ) {
    Todo.remove({
      _id: req.params.todo_id
    }, function(err,todo) {
      if (err)
	res.send(err);
      // again return all todos
      Todo.find(function(err,todos) {
	if (err)
	  res.send(err);
	res.json(todos);
      });
    });
  });

  app.get('*', function(req,res) {
    res.sendfile('./public/index.html');  // load single view file
  });

};
