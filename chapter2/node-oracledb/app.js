var express = require('express');
var http = require('http');
var routes = require('./index');

var app = express();
app.use('/', routes);

var port = process.env.PORT || '8089';
app.set('port', port);

var server = http.createServer(app);
server.listen(port);
server.on('listening', onListening);


function onListening() {
  var addr = server.address();
console.log('address : '+addr);
  var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}


module.exports = app;
