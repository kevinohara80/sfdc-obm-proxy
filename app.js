
/*************************************
 * module dependencies
 *************************************/

var express = require('express');
var http    = require('http');
var path    = require('path');
var request = require('request');
var auth    = require('./lib/middleware').auth;

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  //app.set('views', __dirname + '/views');
  //app.set('view engine', 'jade');
  //app.use(express.favicon());
  app.use(express.logger('dev'));
  //app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(auth);
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

/*************************************
 * routes
 *************************************/

app.get('/', function(req, res) {
  res.send('Proxy offline');
});

app.post('/sfdc-in', function(req, res) {
  res.end(500);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
