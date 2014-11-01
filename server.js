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
  
});

// listen ---------------------------------------------------
var port = 8081;
app.listen( port );
console.log( 'app listening on port %d', port );
