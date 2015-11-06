var express = require('express.io'),
compression = require('compression'),
swig = require('swig');

//Local variables
var server = express();

server.http().io();

//Static files
server.use(express.static('./dist'));

//Config views
server.engine('html',swig.renderFile);
server.set('view engine','html');
server.set('views','./dist/views');

server.set('port', (process.env.PORT || 5000));

//Static files
server.use(compression());
server.use(express.static('./dist'));

//router
var login = require('./lib/login');
server.use(login);

server.get('/',function(req, res){
  res.render('index.html');
});

//Server
if(!module.parent){
  server.listen(server.get('port'), function() {
    console.log("Node app is running at http://localhost:" + server.get('port'));
  });
}else{
  module.exports = server;
}
