
/*************************************
 * module dependencies
 *************************************/

var express  = require('express');
var http     = require('http');
var path     = require('path');
var request  = require('request');
var auth     = require('./lib/middleware').auth;
var parseXml = require('./lib/middleware').parseXml;
var xml2js   = require('xml2js');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  //app.set('views', __dirname + '/views');
  //app.set('view engine', 'jade');
  //app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.methodOverride());
  app.use(auth);
  app.use(parseXml);
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
  //console.log(req.body['soapenv:Envelope']['soapenv:Body'][0].notifications);
  var rawSoap = req.body['soapenv:Envelope']['soapenv:Body'][0].notifications[0];
  var message = {
    'xmlns': rawSoap['$']['xmlns'],
    'organizationId': rawSoap['$']['OrganizationId'],
    'actionId': rawSoap['$']['ActionId'],
    'sessionId': rawSoap['$']['SessionId'],
    'enterpriseUrl': rawSoap['$']['EnterpriseUrl'],
    'partnerUrl': rawSoap['$']['PartnerUrl'],
    'notification': rawSoap['$']['Notification']
  }

  console.dir(message);

  if(!req.body) {
    console.log('[POST] no body found');
    return res.send(400);
  } else {
    return res.send(200);
  }

});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
