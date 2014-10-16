var connect = require('connect');
var http = require('http');
var url = require('url');

var apiKey = "";

// print process.argv
// steam API key will be passed in as commandline variable
process.argv.forEach(function (val, index, array) {
	console.log(index + ': ' + val);
	if (index > 1) {
		apiKey = array[2];
		console.log(apiKey);
	}
});

//Images, Steam ID (More)
//http://dev.dota2.com/showthread.php?t=58317

// connect server
var app = connect();

// parse urlencoded request bodies into req.body
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
		extended : true
	}));

var header = require('connect-header');
app.use(header({
		'Access-Control-Allow-Origin' : 'http://localhost:9001'
	}));

var urlrouter = require('urlrouter');
app.use(urlrouter(function (app) {

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// local utility APIs
		app.get('/', function (req, res, next) {
			res.end('Steam Collector for Node. Just a utility to collect data from Steam for some experiments with DOTA data.');
		});
		app.get('/heroes', function (req, res, next) {
			var heroesJson = require('../data/heroes');
			res.end(JSON.stringify(heroesJson));
		});

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// live Steam server APIs
		// get matches for a given user ID
		//TODO: enhance to take more parameters
		app.get('/matches', function (req, res, next) {

			var url_parts = url.parse(req.url, true);
			var query = url_parts.query;
			var responseBody = "";

			var getResponse = function (resp) {
				console.log("Got response: " + resp.statusCode);
				var body = "";
				resp.on('data', function (chunk) {
					body += chunk;
					responseBody += chunk;
					//console.log('BODY: ' + chunk);
				});

				resp.on('end', function () {
					//res.writeHead(200, "OK", {'Content-Type': 'text/html'});
					responseObj = JSON.parse(responseBody)
						res.end(responseBody);
				});
			};
			if(req.params.userId != null) {
				http.get("http://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v1?key=" + apiKey + "&account_id=" + req.params.userId, getResponse);
			} else if(query != null && query.account_id != null) {
				http.get("http://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v1?key=" + apiKey + "&account_id=" + query.account_id, getResponse);
			}
		});
		
		// get individual match details
		app.get('/matchdetails/:matchId([0-9]+)', function (req, res, next) {
			var responseBody = "";

			var getResponse = function (resp) {
				console.log("Got response: " + resp.statusCode);
				var body = "";
				resp.on('data', function (chunk) {
					body += chunk;
					responseBody += chunk;
				});

				resp.on('end', function () {
					responseObj = JSON.parse(responseBody)
						res.end(responseBody);
				});
			};
			console.log("req params:" + JSON.stringify(req.params));
			http.get("http://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/v1?key=" + apiKey + "&match_id=" + req.params.matchId, getResponse);
		});
		
		app.get('/players', function (req, res, next) {
			var url_parts = url.parse(req.url, true);
			var query = url_parts.query;
			var responseBody = "";
			
			var getResponse = function (resp) {
				console.log("Got response: " + resp.statusCode);
				var body = "";
				resp.on('data', function (chunk) {
					body += chunk;
					responseBody += chunk;
				});

				resp.on('end', function () {
					responseObj = JSON.parse(responseBody)
						res.end(responseBody);
				});
			};
			
			//DOTA player ID: 28463543
			//http://localhost:9002/players?steamids=76561197988729271
			if(query != null && query.steamids != null) {
				http.get("http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002?key=" + apiKey + "&steamids=" + query.steamids, getResponse);
			}
		});
	}));

//create node.js http server and listen on port
http.createServer(app).listen(9002);