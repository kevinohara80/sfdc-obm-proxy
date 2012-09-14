var xml2js = require('xml2js');

module.exports.auth = function(req, res, next) {
  next();
}

module.exports.parseXml = function(req, res, next) {
  if(req.method === 'POST' && req.headers['content-type'] && req.headers['content-type'].indexOf('text/xml') !== -1 ) {
    
    var data = '';
    req.setEncoding('utf8');
    
    req.on('data', function(chunk) {
      data += chunk;
    });
    
    req.on('end', function(){
      var parser = new xml2js.Parser();
      parser.parseString(data, function(err, result) {
        if(err) {
          req.body = '';
          next();
        } else {
          req.body = result;
          next();
        }
      });
    });

  } else {
    req.body = ''
    next();
  }
}