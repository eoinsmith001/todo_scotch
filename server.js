// server.js
// set up 
var express  = require( 'express' );
var app      = express();
var mongoose = require( 'mongoose' );
var morgan   = require( 'morgan' );
var bodyParser = require( 'body-parser' );
var methodOverride = require( 'method-override' );


// config ---------------------------------------------------
// mongoDB db on modulus.io
// mongoose.connect( 'mongodb://node:node@mongo.onmodulus.net:27017/uw03mypu' );
// from http://mongoosejs.com/docs/index.html examples
mongoose.connect( 'mongodb://localhost:27017/test' );

// set static files location - /public/img will be /img for users
app.use( express.static( __dirname + '/public' ) );

app.use( morgan('dev') );

app.use( bodyParser.urlencoded( { 'extended' : 'true' } ) );
app.use( bodyParser.json() );
app.use( bodyParser.json( { type: 'application/vnd.api+json' } ) );
app.use( methodOverride );

// model  ---------------------------------------------------

var Todo = mongoose.model( 'Todo', {
  text: String
});

// routes ---------------------------------------------------

app.get( '/api/todos', function( req, res ) {
  Todo.find( function(err,todos) {
    if (err) 
      res.send(err)
    res.json(todos);  // return todos in json format
  }); 
});

app.post( '/api/todos', function( req, res ) {
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

// delete
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

// listen ---------------------------------------------------
var port = 8081;
app.listen( port );
console.log( 'app listening on port %d', port );
