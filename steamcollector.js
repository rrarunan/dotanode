var http = require('http');
var querystring = require('querystring');
var utils = require('utils');

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

var arunan_steamID = "STEAM_0:1:14231771";
var tmpStr = "";
var matchHistory = {};

//http.get("http://api.steampowered.com/IEconDOTA2_570/GetHeroes/v1?key=" + apiKey, function (res) {
//	console.log("Got response: " + res.statusCode);
//	res.on('data', function (chunk) {
//		console.log('BODY: ' + chunk);
//	});
//}).on('error', function (e) {
//	console.log("Got error: " + e.message);
//});

var req = http.get("http://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v1?key=" + apiKey + "&account_id=76561197988729271", function (res) {
	console.log("Got response: " + res.statusCode);
	var body = "";
	res.on('data', function (chunk) {
		body += chunk;
		//console.log('BODY: ' + chunk);
	});
	
	res.on('end', function() {
		//res.writeHead(200, "OK", {'Content-Type': 'text/html'});
		var responseBody = JSON.parse(body)
        console.log("Got response: ", responseBody);
	});
});

req.on('error', function (e) {
	console.log("Got error: " + e.message);
});

//matchHistory = JSON.parse(tmpStr);
console.log(matchHistory);
