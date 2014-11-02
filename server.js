// set up 
var express  = require( 'express' );
var app      = express();
var mongoose = require( 'mongoose' );
var port     = process.env.PORT || 8081;
var database = require( './config/database' );
var morgan   = require( 'morgan' );
var bodyParser = require( 'body-parser' );
var methodOverride = require( 'method-override' );


// config ---------------------------------------------------
mongoose.connect( database.url );

// set static files location - /public/img will be /img for users
app.use( express.static( __dirname + '/public' ) );
app.use( morgan('dev') );
app.use( bodyParser.urlencoded( { 'extended' : 'true' } ) );
app.use( bodyParser.json() );
app.use( bodyParser.json( { type: 'application/vnd.api+json' } ) );
app.use( methodOverride( 'X-HTTP-Method-Override' ) );

require('./app/routes.js')(app);

// listen ---------------------------------------------------
app.listen( port );
console.log( 'app listening on port %d', port );
