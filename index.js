var express = require('express'),
compression = require('compression'),
bodyParser = require('body-parser'),
swig = require('swig');
var util = require('./lib/util');

//Local variables
var server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json('application/json'));// get information from html forms

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
var auth = require('./lib/auth');
var admin = require('./lib/admin');

server.use(auth);
server.use(admin);

server.get('/',util.isLoggedIn,function(req, res){
  res.render('index',{user: req.user});
});

server.get('/error/:param?',function(req, res){
  res.send(404);
});

server.all('*',function(req, res){
  res.redirect('/error');
});

//Server
if(!module.parent){
  server.listen(server.get('port'), function() {
    console.log("Node app is running at http://localhost:" + server.get('port'));
  });
}else{
  module.exports = server;
}
