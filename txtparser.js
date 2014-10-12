//parse npc_heroes.txt into json
var fs = require('fs');
var fsplit = require('split');
var _ = require('lodash');

var readOptions = {
  encoding: 'utf8',
  flag: 'r'
};

var file = 'npc_heroes.txt';
var jsonFile = 'npc_heroes.json';

process.argv.forEach(function (val, index, array) {
	console.log(index + ': ' + val);
	if (index > 1) {
		file = array[2] + '.txt';
		jsonFile = array[2] + '.json';
	}
});

var prevLine = "";
var writableStream = fs.createWriteStream(jsonFile);

var escapeBackslash = function(str) {
  return str.replace('\\', '\\\\');
};

//TODO: Fix issues
// 1- `//` comment lines have snuck in
// 2- LoadOutScale funky
// 3- keys starting with comments (sucks)
// 4- comments part of values in some cases
// 5- paths on some files messing up json

var txtToJson = function(line) {
  var arr = line.split(/[\t]+/);
  //read line and add to json
  if(line.indexOf('{') !== -1) {
    //console.log(line + '\n');
    if(prevLine === 'CLOSE_BRACE') {
      writableStream.write(',\n');
    }
    writableStream.write(line.trim() + '\n');
    prevLine = "OPEN_BRACE";
  } else if(line.indexOf('}') !== -1) {
      if(prevLine === 'WRITE_PROP') {
        writableStream.write('\n');
      }
      writableStream.write(line.trim());
      prevLine = "CLOSE_BRACE";
  } else if(arr.length > 0) {
      if(arr.length === 2) {
        if(arr[1].indexOf('"') !== -1) {
          if(prevLine === 'WRITE_PROP' || prevLine === 'CLOSE_BRACE') {
              writableStream.write(',\n');
          }
          writableStream.write(escapeBackslash(arr[1]) + ': \n');
          prevLine = "START_OBJ";
        }
      } else if(arr.length > 2) {
        if(arr[1].indexOf('"') !== -1 && arr[2].indexOf('"') !== -1){
          if(prevLine === 'WRITE_PROP' || prevLine === 'CLOSE_BRACE') {
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
  
 //TODO: Fix comments after parsing into JSON. Some lines still have comments left. Some have `:` in random places.
 //Maybe run jsonlint and fix errors ?

  /*
var heroes = require('./heroes');
var pickedHero = _.pick(heroes, function(value, key) {
  return key.indexOf('npc_dota_hero_elder_titan') !== -1;
});
console.log(pickedHero);
//console.log(heroes);
*/