var connect = require('connect');
var http = require('http');

var app = connect();

// gzip/deflate outgoing responses
var compression = require('compression');
app.use(compression());

// store session state in browser cookie
var cookieSession = require('cookie-session');
app.use(cookieSession({
    keys: ['secret1', 'secret2']
}));

// parse urlencoded request bodies into req.body
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// respond to all requests
//app.use(function(req, res){
//  res.end('Hello from Connect!\n');
//})

var header = require('connect-header');
app.use(header({
	'Access-Control-Allow-Origin': 'http://localhost:9001'
}));


var urlrouter = require('urlrouter');
app.use(urlrouter(function (app) {
  app.get('/', function (req, res, next) {
    res.end('hello urlrouter');
  });
  app.get('/user/:id([0-9]+)', function (req, res, next) {
    res.end('hello user ' + req.params.id);
  });
  app.get('/heroes', function (req, res, next) {
	var heroesJson = require('../data/heroes');
	res.end(JSON.stringify(heroesJson));
  });
}));

//create node.js http server and listen on port
http.createServer(app).listen(8000);

//http.get("http://api.steampowered.com/IEconDOTA2_570/GetHeroes/v1?key=42E379CD222A1D2B33E92A1E1816C2C6", function(res) {
//  console.log("Got response: " + res.statusCode);
//  res.on('data', function (chunk) {
//    console.log('BODY: ' + chunk);
//  });
//}).on('error', function(e) {
//  console.log("Got error: " + e.message);
//});