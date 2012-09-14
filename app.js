
/*************************************
 * module dependencies
 *************************************/

var express = require('express');
var http    = require('http');
var path    = require('path');
var request = require('request');
var auth    = require('./lib/middleware').auth;
var xml2js  = require('xml2js');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  //app.set('views', __dirname + '/views');
  //app.set('view engine', 'jade');
  //app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
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
  
  // if no body, respond with a 400
  if(!req.body) {
    console.log('[POST] no body found');
    return res.send(400);
  }

  var parser = new xml2js.Parser();

  parser.parseString(req.body, function(err, result) {
    if(err) {
      console.log('[POST] xml parser error');
      return res.send(400);
    }

    console.dir(result);
    return res.send(200);

  });

});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
