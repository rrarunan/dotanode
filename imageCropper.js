var fs = require('fs'),
 	gm = require('gm');

 fs.readdir('./src/assets/images/items/',function(err,files){
    if(err) throw err;
    files.forEach(function(file){
        // do something with each file HERE!
        var fileNameArray = file.split('/');
        console.log("Processing " + file + "...");
        var fileName;
        var len = fileNameArray.length;
        if (fileNameArray && len >= 1) {
        	fileName = fileNameArray[len-1];
        	console.log("Writing " + fileName + "...");
        }
        gm('./src/assets/images/items/' + file)
			.crop(85, 64, 0, 0)
			.write('./src/assets/croppedImages/items/' + fileName, function (err) {
			  if (!err) {
			  	console.log(fileName + ' was written.');
			  } else {
			  	console.log(err);
			  }
			});
    });
 });