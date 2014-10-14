//parse npc_heroes.txt into json
var fs = require('fs');
var fsplit = require('split');
var _ = require('lodash');

var readOptions = {
	encoding : 'utf8',
	flag : 'r'
};

var file = 'npc_heroes.txt';
var jsonFile = 'npc_heroes.json';

var prevLine = "";
var writableStream = fs.createWriteStream(jsonFile);

var escapeBackslash = function (str) {
	return str.replace('\\', '\\\\');
};

/*

The Dota2 API generally gives you people's SteamIDs as 32-bit numbers.

In order to convert from these 32-bit numbers to Steam Names, you must first convert between the 32-bit ID and 64-bit ID:
On a system that supports up to 64-bit numbers you can do the following:
STEAMID64 - 76561197960265728 = STEAMID32
STEAMID32 + 76561197960265728 = STEAMID64
OR
STEAMID32 = The right-most 32-bits of STEAMID64
STEAMID64 = concatenate("00000001000100000000000000000001", STEAMID32);
On a system that only supports up to 32-bit numbers - it's trickier. You have to rely on the language's built-in "big number" functions (i.e. PHP's gmp extension: see this post for details)
Once you have the 64-bit ID, then you can use the GetPlayerSummaries call to get their detail!

*/

//TODO: Fix issues
// 1- `//` comment lines have snuck in
// 2- LoadOutScale funky
// 3- keys starting with comments (sucks)
// 4- comments part of values in some cases
// 5- paths on some files messing up json

var txtToJson = function (line) {
	var arr = line.split(/[\t]+/);
	//read line and add to json
	if (line.indexOf('{') !== -1) {
		//console.log(line + '\n');
		if (prevLine === 'CLOSE_BRACE') {
			writableStream.write(',\n');
		}
		writableStream.write(line.trim() + '\n');
		prevLine = "OPEN_BRACE";
	} else if (line.indexOf('}') !== -1) {
		if (prevLine === 'WRITE_PROP') {
			writableStream.write('\n');
		}
		writableStream.write(line.trim());
		prevLine = "CLOSE_BRACE";
	} else if (arr.length > 0) {
		if (arr.length === 2) {
			if (arr[1].indexOf('"') !== -1) {
				if (prevLine === 'WRITE_PROP' || prevLine === 'CLOSE_BRACE') {
					writableStream.write(',\n');
				}
				writableStream.write(escapeBackslash(arr[1]) + ': \n');
				prevLine = "START_OBJ";
			}
		} else if (arr.length > 2) {
			if (arr[1].indexOf('"') !== -1 && arr[2].indexOf('"') !== -1) {
				if (prevLine === 'WRITE_PROP' || prevLine === 'CLOSE_BRACE') {
					writableStream.write(",\n");
				}
				writableStream.write(escapeBackslash(arr[1]) + ": " + escapeBackslash(arr[2]));
				prevLine = "WRITE_PROP";
			}
		}
	}
};

var readableStream = fs.createReadStream(file)
	.on('error', function (err) {
		console.log(err);
	});

readableStream.pipe(fsplit())
.on('data', function (line) {
	txtToJson(line);
	//each chunk now is a seperate line!
	//if(line.indexOf('npc_dota_hero') !== -1) {
	//  console.log(line);
	//}
})
.on('error', function (err) {
	console.log(err);
});

var heroes = require('./heroes');
var pickedHero = _.pick(heroes, function (value, key) {
		return key.indexOf('npc_dota_hero_elder_titan') !== -1;
	});
console.log(pickedHero);
//console.log(heroes);
