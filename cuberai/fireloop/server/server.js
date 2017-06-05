'use strict';
require('ts-node/register');
var loopback     = require('loopback');
var boot         = require('loopback-boot');
var cookieParser = require('cookie-parser');

var app = module.exports = loopback();

app.use(cookieParser());

app.start = function() {
  // start the web server
  var server = app.listen(function() {
    app.emit('started', server);
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
  return server;
};

app.channelSub = function(clientID, channelID) {
		console.log('inside channelSub', clientID);
	    app.mx.IO.on('test', function (message) {
	      console.log('MESSAGE: ', message);
	    });
		app.mx.IO.emit('test', 'Hello World');
    	app.mx.IO.on('HumanSaid'+clientID, function(message) {
    		console.log('entering inside cuber HumanSaid', message);
    		console.log('leaving inside cuber HumanSaid', message);
      });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
